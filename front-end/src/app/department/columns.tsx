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

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast, useToast } from "@/components/ui/use-toast";

export type Department = {
    id: number;
    departmentReferenceNumber: string;
    departmentCode: string;
    departmentName: string;
    departmentType: string;
    userId?: number;
};

import Link from "next/link";

const deleteDepartment = async (
    departmentReferenceNumber: string,
    showToast: any
) => {
    // const toast = useToast();
    try {
        const res = await fetch(
            `http://127.0.0.1:8000/api/department/delete/${departmentReferenceNumber}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            }
        );
        if (!res.ok) {
            throw new Error("Failed to delete department");
        }
        showToast({
            title: "Department deleted",
        });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } catch (error) {
        console.error(error);
        showToast({
            title: "Failed to delete department",
            variant: "destructive",
        });
    }
};

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
        accessorKey: "departmentName",
    },
    {
        header: "Department Type",
        accessorKey: "departmentType",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const department = row.original;
            const { toast } = useToast();
            return (
                <Dialog>
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
                                <Link
                                    href={`department/${department.departmentReferenceNumber}`}
                                >
                                    Show
                                </Link>
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>Update</DropdownMenuItem>
                            </DialogTrigger>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => {
                                    deleteDepartment(
                                        department.departmentReferenceNumber,
                                        toast
                                    );
                                    // toast({
                                    //     title: "Department deleted",
                                    // });
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dialog content must be outside */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Department</DialogTitle>
                            <DialogClose />
                        </DialogHeader>
                        <DialogDescription>
                            Update the department details.
                        </DialogDescription>
                        <DialogFooter>
                            <Button variant="ghost">Cancel</Button>
                            <Button>Update</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            );
        },
    },
];
