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
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface TableApiProps<T extends { id: number | string }> {
  data: T[] | null;
  columns: ColumnDef<T>[];
  basepath: string; // Add basePath prop
  fpath: string | null;
  rowClickHandler?: (row: T) => void; // Optional row click handler
}

function TableApi<T extends { id: string | number }>({
  data,
  columns,
  basepath,
  fpath,
  rowClickHandler,
}: TableApiProps<T>) {
  const t = useTranslations("table");
  const router = useRouter();

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                    ? rowClickHandler(row.original) // Use custom rowClickHandler
                    : fpath
                    ? router.push(`${basepath}/${fpath}`)
                    : router.push(`/${basepath}/${row.original.id}`) // Default behavior
              } // Use dynamic basePath
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
