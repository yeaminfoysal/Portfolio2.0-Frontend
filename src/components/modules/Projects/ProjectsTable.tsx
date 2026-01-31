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
import ProjectUpdateModal from "./ProjectUpdateModal"


export interface IProject {
    _id?: string
    title: string
    thumbnail: string
    technologies: {
        frontend?: string[]
        backend?: string[]
        database?: string[]
        tools?: string[]
    }
    repositories?: {
        client?: string
        server?: string
    }
    preview: string
    overview?: string
    features: string[]
    challenges?: string[]
    plans?: string[]
    status?: "Ongoing" | "Completed"
    category?: "Full-stack" | "Frontend" | "Backend"
    isFeatured?: boolean
    createdAt?: Date
    updatedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectActionsCell = ({ project }: { project: any }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem 
                        onClick={() => setOpen(true)}
                        className="text-sm"
                    >
                        Update Project
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => window.open(project.preview, "_blank")}
                        className="text-sm"
                    >
                        View Live
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Update Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[95vw] md:w-[90vw] lg:max-w-[800px] max-h-[90vh] overflow-y-auto border-none shadow-none bg-background p-4 md:p-6">
                    <ProjectUpdateModal project={project} />
                </DialogContent>
            </Dialog>
        </>
    );
};


export const columns: ColumnDef<IProject>[] = [
    {
        accessorKey: "title",
        header: "Project Details",
        cell: ({ row }) => {
            const project = row.original
            const firstImage = project.thumbnail

            return (
                <div className="flex items-start gap-2 md:gap-4 py-2">
                    {/* Thumbnail */}
                    {firstImage ? (
                        <Image
                            src={firstImage}
                            alt={project.title}
                            height={80}
                            width={80}
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border flex-shrink-0"
                        />
                    ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                            No Image
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col w-full min-w-0">
                        <h3 className="font-semibold text-xs md:text-sm mb-1 line-clamp-2">
                            {project.title}
                        </h3>

                        {project.overview && (
                            <p className="text-[10px] md:text-xs text-gray-700 dark:text-gray-400 line-clamp-2 mb-2">
                                {project.overview}
                            </p>
                        )}

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 text-[10px] md:text-xs text-muted-foreground">
                            {[
                                ...(project.technologies.frontend || []),
                                ...(project.technologies.backend || []),
                                ...(project.technologies.database || []),
                                ...(project.technologies.tools || []),
                            ].slice(0, 5).map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-1.5 md:px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md whitespace-nowrap"
                                >
                                    {tech}
                                </span>
                            ))}
                            {[
                                ...(project.technologies.frontend || []),
                                ...(project.technologies.backend || []),
                                ...(project.technologies.database || []),
                                ...(project.technologies.tools || []),
                            ].length > 5 && (
                                <span className="px-1.5 md:px-2 py-0.5 text-gray-500">
                                    +{[
                                        ...(project.technologies.frontend || []),
                                        ...(project.technologies.backend || []),
                                        ...(project.technologies.database || []),
                                        ...(project.technologies.tools || []),
                                    ].length - 5}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span
                className={`px-2 py-1 text-[10px] md:text-xs font-medium rounded-full whitespace-nowrap ${
                    row.getValue("status") === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
            >
                {row.getValue("status")}
            </span>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ProjectActionsCell project={row.original} />
    }
]

export function ProjectTable({ projects }: { projects: IProject[] }) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: projects,
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
        <div className="w-full p-4 md:p-6">
            {/* Search Input */}
            <div className="flex items-center py-3 md:py-4">
                <Input
                    placeholder="Search projects..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-full md:max-w-sm text-sm"
                />
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-md border">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-left whitespace-nowrap text-xs md:text-sm"
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
                                            className="align-top py-2 md:py-3"
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
                                    className="h-24 text-center text-sm"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between md:justify-end space-x-2 py-4">
                <div className="text-xs md:text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} project(s)
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="text-xs md:text-sm"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="text-xs md:text-sm"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}