import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";

function TableApi<T extends { id: string | number }>({
  data,
  columns,
  basepath,
  fpath,
  rowClickHandler,
}: {
  data: T[] | null;
  columns: ColumnDef<T>[];
  basepath: string;
  fpath: string | null;
  rowClickHandler?: (row: T) => void;
}) {
  const t = useTranslations("table");
  const router = useRouter();

  // Define sorting state with the correct type
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting, // Pass the setter function
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
              key={header.id}
              onClick={header.column.getToggleSortingHandler()} // Enables sorting on click
              className="cursor-pointer"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getIsSorted() === "asc" && <ArrowUp />}
              {header.column.getIsSorted() === "desc" && <ArrowDown />}
            </TableHead>            
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {data === null ? (
          <SkeletonLoader rowCount={5} columnCount={columns.length} />
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={
                () =>
                  rowClickHandler
                    ? rowClickHandler(row.original)
                    : fpath
                    ? router.push(`${basepath}/${fpath}`)
                    : router.push(`/${basepath}/${row.original.id}`)
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {t("noResults")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export const SkeletonLoader: React.FC<{
  rowCount: number;
  columnCount: number;
}> = ({ rowCount, columnCount }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableApi;
