"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BlogUpdateModal from "./BlogUpdateModal"
// import ProjectUpdateModal from "./ProjectUpdateModal"


export interface IBlog {
    _id?: string;
    title: string;
    author?: string;
    thumbnail: string;
    category: string;
    views?: number;
    description: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const BlogActionsCell = ({ blog }: { blog: IBlog }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* ✅ Update blogs */}
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        Update Blog
                    </DropdownMenuItem>

                    {/* <DropdownMenuItem
                        onClick={() => window.open(blog.preview, "_blank")}
                    >
                        View Live
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* ✅ Update Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="w-[95vw] md:w-[90vw] lg:max-w-[800px] max-h-[90vh] overflow-y-auto border-none shadow-none bg-background"
                >
                    <BlogUpdateModal blog={blog} />
                </DialogContent>


            </Dialog>
        </>
    );
};


export const columns: ColumnDef<IBlog>[] = [
    {
        accessorKey: "title",
        header: "Blog Details",
        cell: ({ row }) => {
            const blog = row.original

            return (
                <div className="flex items-start gap-4 py-2">
                    {/* Thumbnail */}
                    {blog?.thumbnail ? (
                        <Image
                            src={blog?.thumbnail}
                            alt={blog.title}
                            height={80}
                            width={80}
                            className="w-20 h-20 object-cover rounded-md border flex-shrink-0"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                            No Image
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col w-full">
                        <h3 className="font-semibold text-sm mb-1">{blog?.title}</h3>

                        {blog?.description && (
                            <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-2">
                                {blog?.description}
                            </p>
                        )}

                        {/* Technologies */}
                        {/* <div className="flex flex-wrap gap-1 mt-2 text-xs text-muted-foreground">
                            {[
                                ...(project.technologies.frontend || []),
                                ...(project.technologies.backend || []),
                                ...(project.technologies.database || []),
                                ...(project.technologies.tools || []),
                            ].map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md whitespace-nowrap"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div> */}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "views",
        header: "Views",
        cell: ({ row }) => (
            <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${row.getValue("views") === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                    }`}
            >
                {row.getValue("views")}
            </span>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <BlogActionsCell blog={row.original} />
    }
]

export function BlogsTable({ blogs }: { blogs: IBlog[] }) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: blogs,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search blogs..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table className="table-auto w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-left whitespace-nowrap"
                                    >
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="align-top">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="align-top py-3 whitespace-normal break-words"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
