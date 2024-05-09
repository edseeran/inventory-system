"use client";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import axios from "axios";
import { useEffect, useState } from "react";

type Department = {
    id: number;
    departmentReferenceNumber: string;
    departmentCode: string;
    departmentName: string;
    departmentType: string;
};

export default function Home() {
    const [departments, setDepartments] = useState<Department[]>([]);

    async function fetchData() {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/department/index",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            setDepartments(response.data.results);
        } catch (error) {
            // Handle error: show a message to the user, log the error, etc.
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="border rounded-lg w-full">
            <div className="relative w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="w-[100px]">
                                Reference No.
                            </TableHead>
                            <TableHead>Department Code</TableHead>
                            <TableHead>Department Name</TableHead>
                            <TableHead>Department Type</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell className="font-medium">
                                    {department.departmentReferenceNumber}
                                </TableCell>
                                <TableCell>
                                    {department.departmentCode}
                                </TableCell>
                                <TableCell>
                                    {department.departmentName}
                                </TableCell>
                                <TableCell>
                                    {department.departmentType}
                                </TableCell>
                                <TableCell className="text-right space-x-3">
                                    <Dialog>
                                        <DialogTrigger className="text-blue-500">
                                            Edit
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Are you absolutely sure?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete your
                                                    account and remove your data
                                                    from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger className="text-red-500">
                                            Delete
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Are you absolutely sure?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete your
                                                    department and remove your
                                                    data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
