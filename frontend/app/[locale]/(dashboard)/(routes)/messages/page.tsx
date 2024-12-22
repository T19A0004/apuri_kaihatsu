"use client";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import PaginationApi from "@/components/PaginationApi";
import { Input } from "@/components/ui/input";
import { Link, usePathname, useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import PostApi from "@/types/postApi";
import Post from "@/types/post";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import TableApi from "@/components/TableApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import useApiQuery from "@/lib/useApiQuery";
import useApiMutation from "@/lib/useApiMutation";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Info() {
  const t = useTranslations("posts");
  const tName = useTranslations("names");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Format the selected date for filtering
  const queryDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  // Fetch all data from the API (no backend filtering)
  const { data } = useApiQuery<PostApi>(
    `post/list?page=${page}&text=${search}`,
    ["posts", page, search]
  );

  // Filter posts by the selected date on the frontend
  const filteredPosts = data?.posts?.filter((post) => {
    const postDate = new Date(post.sent_at).toLocaleDateString("en-CA"); // Format as "yyyy-MM-dd"
    return queryDate ? postDate === queryDate : true; // Match date or show all if no date selected
  });

  const pathName = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [postId, setPostId] = useState<number | null>(null);

  const resetFilters = () => {
    setSelectedDate(null);
    setSearch("");
    setPage(1);
  };

  const { mutate } = useApiMutation<{ message: string }>(
    `post/${postId}`,
    "DELETE",
    ["deletePost"],
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast({
          title: t("postDeleted"),
          description: data?.message,
        });
      },
    }
  );

  const postColumns: ColumnDef<Post>[] = [
    {
      accessorKey: "title",
      header: t("postTitle"),
      cell: ({ row }) => (
        <Link href={`messages/${row.original.id}`}>
          {row.getValue("title")}
        </Link>
      ),
    },
    {
      accessorKey: "description",
      header: t("Description"),
      cell: ({ row }) => (
        <Link href={`messages/${row.original.id}`}>
          {row.getValue("description")}
        </Link>
      ),
    },
    {
      accessorKey: "admin_name",
      header: t("Admin_name"),
      cell: ({ row }) => (
        <Link href={`messages/${row.original.id}`}>
          {tName("name", { ...row?.original?.admin })}
        </Link>
      ),
    },
    {
      accessorKey: "priority",
      header: t("Priority"),
      cell: ({ row }) => (
        <Link href={`messages/${row.original.id}`}>
          {row.getValue("priority")}
        </Link>
      ),
    },
    {
      accessorKey: "sent_at",
      header: "Sent Date",
      cell: ({ row }) => (
        <Link href={`messages/${row.original.id}`}>
          {new Date(row.getValue("sent_at")).toLocaleDateString()} {/* Show only date */}
        </Link>
      ),
    },
    {
      header: t("action"),
      cell: ({ row }) => (
        <Dialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()} // Stop row click
            >
              <EllipsisVertical className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem
                onClick={() => router.push(`${pathName}/${row.original.id}`)}
              >
                {t("view")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`${pathName}/edit/${row.original.id}`)
                }
              >
                {t("edit")}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DialogTrigger className="w-full">{t("delete")}</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{row.getValue("title")}</DialogTitle>
              <DialogDescription>
                {row.getValue("description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>{t("doYouDeleteMessage")}</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"secondary"}>{t("cancel")}</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() => {
                  setPostId(row.original.id);
                  mutate();
                }}
              >
                {t("delete")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl w-2/4 font-bold">{t("posts")}</h1>
        <Link href={`${pathName}/create`} passHref>
          <Button>{t("createpost")}</Button>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Input
            placeholder={t("filter")}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="secondary" onClick={resetFilters}>
            Reset Filter
          </Button>
        </div>
        <div>
          <PaginationApi data={data?.pagination ?? null} setPage={setPage} />
        </div>
      </div>
      <Card>
        <TableApi
          data={filteredPosts ?? []} // Use the filtered posts
          columns={postColumns}
          basepath="messages"
          fpath={null}
        />
      </Card>
    </div>
  );
}
