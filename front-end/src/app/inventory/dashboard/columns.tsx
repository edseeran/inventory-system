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

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export type Inventory = {
    inventoryFormReferenceNumber: string;
    facilityType: string;
    departmentId: number;
    asOfDate: string;
};

import Link from "next/link";

const deleteInventoryForm = async (inventoryFormReferenceNumber: string) => {
    try {
        const res = await fetch(
            `http://127.0.0.1:8000/api/inventory-form/delete/${inventoryFormReferenceNumber}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (!res.ok) {
            throw new Error("Failed to delete Inventory Form");
        }
        window.location.reload();

    } catch (error) {
        console.error(error);
    }
};

export const columns: ColumnDef<Inventory>[] = [

    {
        // header: "Department Reference Number",
        accessorKey: "inventoryFormReferenceNumber",
        header: () => <div className="text-left">INVENTORY REFERENCE NO.</div>,
        cell: ({ row }) => (
            <div className="font-medium">
                {row.getValue("inventoryFormReferenceNumber")}
            </div>
        ),
    },
    {
        accessorKey: "asOfDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    AS OF DATE
                    <ArrowUpDown className="ml-2 h-4 w-4 center" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="ml-4">{row.getValue("asOfDate")}</div>
        ),
    },
    {
        header: "FACILITY",
        accessorKey: "facilityType",
    },

    {
        header: "DEPARTMENT",
        accessorKey: "departmentCode",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const inventoryForm = row.original;
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
                                    // href={`department/${department.departmentReferenceNumber}`}
                                    href={`/inventory/${inventoryForm.inventoryFormReferenceNumber}`}
                                >
                                    Show
                                </Link>
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>Update</DropdownMenuItem>
                            </DialogTrigger>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() =>
                                    deleteInventoryForm(
                                        inventoryForm.inventoryFormReferenceNumber
                                    )
                                }
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
