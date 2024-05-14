"use client";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
    TableHeader,
    TableHead,
} from "@/components/ui/table";

import { Plus, Minus } from "lucide-react";

interface Row {
    department: string;
    facilityType: string;
    asOfDate: string;
    item: string;
    brand: string;
    quantity: number;
    itemSerialNumber: string;
    datePurchased: string;
    amount: number;
    dateIssued: string;
    itemStatus: string;
}

const formSchema = z
    .object({
        department: z.string().min(2, {
            message: "Department must be at least 2 characters.",
        }),
        // facilityType: z.enum(["LABORATORY", "CLASSROOM", "OFFICE", "OTHERS"]),
        facilityType: z.string(),
        asOfDate: z.string(),
        item: z.string(),
        brand: z.string(),
        quantity: z.number(),
        itemSerialNumber: z.string(),
        datePurchased: z.string(),
        amount: z.number(),
        dateIssued: z.string(),
        itemStatus: z.string(),
    })
    .required();

const DynamicTable = () => {
    const [rows, setRows] = useState<Row[]>([
        {
            department: "",
            facilityType: "",
            asOfDate: "",
            item: "",
            brand: "",
            quantity: 0,
            itemSerialNumber: "",
            datePurchased: "",
            amount: 0,
            dateIssued: "",
            itemStatus: "",
        },
    ]);

    const handleAddRow = () => {
        setRows([
            ...rows,
            {
                department: "",
                facilityType: "",
                asOfDate: "",
                item: "",
                brand: "",
                quantity: 0,
                itemSerialNumber: "",
                datePurchased: "",
                amount: 0,
                dateIssued: "",
                itemStatus: "",
            },
        ]);
    };

    const handleSubtractRow = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date, index, field) => {
        setSelectedDate(date);
        handleInputChange(index, field, date);
    };

    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: "",
            facilityType: "",
            item: "",
            brand: "",
            quantity: 0,
            itemSerialNumber: "",
            datePurchased: "00-00-0000",
            amount: 0,
            dateIssued: "00-00-0000",
            itemStatus: "",
        },
    });

    const renderFormFields = (row: Row, index: number) => {
        const fields = [
            {
                key: 'department',
            },
            {
                key:  'facilityType',
            },
            {
                key: 'item',
            },
            {
                key: 'brand',
            },
            {
                key: 'quantity',
                type: 'number',
            },
            {
                key: 'itemSerialNumber',
            },
            {
                key: 'datePurchased',
                type: 'date',
            },
            {
                key: 'amount',
            },
            {
                key: 'dateIssued',
                type: 'date',
            },
            {
                key: 'itemStatus',
            }
        ]

        return fields.map((formField: {key: string}) => {
            return (
                <TableCell key={formField.key} className="py-2 px-4 border-b">
                    <input
                        type={formField.type}
                        value={row[formField.key]}
                        onChange={(e) =>
                            handleInputChange(index, formField.key, e.target.value)
                        }
                        className="w-full p-2 border rounded"
                    />
                </TableCell>
            );
        });
    };

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white border border-gray-300">
                <TableCaption className="p-2">Dynamic Table</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-2 px-4 border-b">
                            DEPARTMENT
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b">
                            FACILITY TYPE
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            ITEM
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            BRAND
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            QUANTITY
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            ITEM SERIAL NUMBER
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            DATE PURCHASED
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            AMOUNT
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            DATE ISSUED
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            ITEM STATUS
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <>
                        {rows.map((row, index) => renderFormFields(row, index))}
                    </>
                </TableBody>
                <Button type="submit">Save changes</Button>
            </Table>
        </div>
    );
};

export default function TestPage() {
    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
            <DynamicTable />
        </div>
    );
}
