"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Department = {
    id: number;
    departmentReferenceNumber: string;
    departmentCode: string;
    departmentName: string;
    departmentType: string;
    userId?: number;
};

import Link from "next/link";

export const columns: ColumnDef<Department>[] = [
    {
        // header: "Department Reference Number",

        accessorKey: "departmentReferenceNumber",
        header: () => <div className="text-left">Reference No.</div>,
        cell: ({ row }) => (
            <div className="font-medium">
                {row.getValue("departmentReferenceNumber")}
            </div>
        ),
    },
    {
        accessorKey: "departmentCode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Department Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        header: "Department Name",
        accessorKey: "  ",
    },
    {
        header: "Department Type",
        accessorKey: "departmentType",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const department = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        // onClick={() =>
                        //     navigator.clipboard.writeText(department.id)
                        // }
                        // onClick={() => console.log(department.id)}
                        >
                            <Link href={`department/${department.id}`}>
                                Show
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
