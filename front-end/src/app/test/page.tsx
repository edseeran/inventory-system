"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
    TableHeader,
    TableHead,
} from "@/components/ui/table";

interface Row {
    ref: string;
    item: string;
}

const DynamicTable = () => {
    const [rows, setRows] = useState<Row[]>([{ ref: "", item: "" }]);

    const handleAddRow = () => {
        setRows([...rows, { ref: "", item: "" }]);
    };

    const handleSubtractRow = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleInputChange = (
        index: number,
        field: keyof Row,
        value: string
    ) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white border border-gray-300">
                <TableCaption className="p-2">Dynamic Table</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-2 px-4 border-b">
                            Ref
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b">
                            Item
                        </TableHead>
                        <TableHead className="py-2 px-4 border-b text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="py-2 px-4 border-b">
                                <input
                                    type="text"
                                    value={row.ref}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "ref",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            </TableCell>
                            <TableCell className="py-2 px-4 border-b">
                                <input
                                    type="text"
                                    value={row.item}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "item",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            </TableCell>
                            <TableCell className="py-2 px-4 border-b text-center">
                                <Button
                                    onClick={handleAddRow}
                                    variant="outline"
                                >
                                    +
                                </Button>
                                <Button
                                    onClick={() => handleSubtractRow(index)}
                                    variant="outline"
                                >
                                    -
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
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
