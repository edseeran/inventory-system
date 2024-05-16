"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
    TableHeader,
    TableHead,
} from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Minus, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComboBox } from "@/components/ui/combo-box";

const rowSchema = z.object({
    item: z.string().min(1),
    brand: z.string().min(1),
    // quantity: z.number().int().min(1),
    quantity: z.coerce.number().int().min(1),
    itemSerialNumber: z.string().min(1),
    datePurchased: z.date(),
    amount: z.coerce.number().min(1),
    dateIssued: z.date(),
    itemStatus: z.string().min(1),
});

const formSchema = z.object({
    department: z.string().min(1),
    facilityType: z.string().min(1),
    asOfDate: z.date(),
    rows: z.array(rowSchema),
});

interface Row {
    item: string;
    brand: string;
    quantity: number;
    itemSerialNumber: string;
    datePurchased: Date; // Change type to Date
    amount: number;
    dateIssued: Date; // Change type to Date
    itemStatus: string;
}

const FacilityTypeChoices = [
    { value: "CLASSROOM", label: "Classroom" },
    { value: "OFFICE", label: "Office" },
    { value: "LABORATORY", label: "Laboratory" },
    { value: "OTHERS", label: "Others" },
];

const ItemStatusChoices = [
    { value: "WORKING", label: "Working" },
    { value: "NOT WORKING", label: "Not Working" },
    { value: "FOR REPAIR", label: "For Repair" },
    { value: "FOR CALIBRATION", label: "For Calibration" },
];

const DynamicTable = () => {
    const [rows, setRows] = useState<Row[]>([
        {
            item: "TEST ITEM",
            brand: "TEST BRAND",
            quantity: 1,
            itemSerialNumber: "TEST",
            datePurchased: new Date(),
            amount: 1,
            dateIssued: new Date(),
            itemStatus: "WORKING",
        },
    ]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: "ICTDU",
            facilityType: "OFFICE",
            asOfDate: new Date(),
            rows: rows,
        },
    });

    const handleAddRow = () => {
        const newRow = {
            item: "",
            brand: "",
            quantity: 1,
            itemSerialNumber: "",
            datePurchased: null,
            amount: 0,
            dateIssued: null,
            itemStatus: "",
        };
        setRows((prevRows) => [...prevRows, newRow]);
        form.setValue("rows", [...form.getValues("rows"), newRow]);
    };

    const handleSubtractRow = (index: number) => {
        const updatedRows = form
            .getValues("rows")
            .filter((_, i) => i !== index);
        setRows(updatedRows);
        form.setValue("rows", updatedRows);
    };

    const renderFormFields = (row: Row, index: number) => (
        <TableRow key={index}>
            {Object.keys(row).map((key) => {
                if (key === "datePurchased" || key === "dateIssued") {
                    return (
                        <TableCell key={key} className="py-2 px-4 border-b">
                            <FormField
                                control={form.control}
                                name={`rows.${index}.${key}`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TableCell>
                    );
                } else if (key === "itemStatus") {
                    return (
                        <TableCell key={key} className="py-2 px-4 border-b">
                            <FormField
                                control={form.control}
                                name={`rows.${index}.${key}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </FormLabel>
                                        <FormControl>
                                            <ComboBox
                                                choices={ItemStatusChoices}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TableCell>
                    );
                }
                return (
                    <TableCell key={key} className="py-2 px-4 border-b">
                        <FormField
                            control={form.control}
                            name={`rows.${index}.${key}`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={key}
                                            {...field}
                                            type={
                                                ["quantity", "amount"].includes(
                                                    key
                                                )
                                                    ? "number"
                                                    : "text"
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TableCell>
                );
            })}
            <TableCell className="py-2 px-4 border-b">
                <Button type="button" onClick={() => handleSubtractRow(index)}>
                    <Minus className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    );

    // const onSubmit = (values: z.infer<typeof formSchema>) => {
    //     console.log(values);
    // };
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/inventory-form/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    // body: JSON.stringify({
                    //     department: "ICTDU",
                    //     facilityType: "CLASSROOM",
                    //     asOfDate: "2024-05-15",
                    //     inventoryForm: [
                    //         {
                    //             item: "Laptop",
                    //             brand: "Dell",
                    //             quantity: 10,
                    //             itemSerialNumber: "DL12345XYZ",
                    //             datePurchased: "2023-04-20",
                    //             amount: 1200.0,
                    //             dateIssued: "2023-05-01",
                    //             itemStatus: "WORKING",
                    //         },
                    //     ],
                    // }),
                    body: JSON.stringify({
                        department: values.department,
                        facilityType: values.facilityType,
                        asOfDate: new Date(values.asOfDate)
                            .toISOString()
                            .split("T")[0],
                        inventoryForm: values.rows.map((row) => ({
                            item: row.item,
                            brand: row.brand,
                            quantity: row.quantity,
                            itemSerialNumber: row.itemSerialNumber,
                            datePurchased: new Date(row.datePurchased)
                                .toISOString()
                                .split("T")[0],
                            amount: row.amount,
                            dateIssued: new Date(row.dateIssued)
                                .toISOString()
                                .split("T")[0],
                            itemStatus: row.itemStatus,
                        })),
                    }),
                }
            );

            if (res.ok) {
                const data = await res.json();
                console.log(data);
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-between">
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dept" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="facilityType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Facility Type</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Facility" {...field} /> */}
                                    <div>
                                        <ComboBox
                                            choices={FacilityTypeChoices}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="asOfDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>As Of Date</FormLabel>
                                <div>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table className="min-w-full bg-white border border-gray-300">
                        <TableCaption className="p-2">
                            Dynamic Table
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                {[
                                    // "DEPARTMENT",
                                    // "FACILITY TYPE",
                                    // "AS OF DATE",
                                    "ITEM",
                                    "BRAND",
                                    "QUANTITY",
                                    "ITEM SERIAL NUMBER",
                                    "DATE PURCHASED",
                                    "AMOUNT",
                                    "DATE ISSUED",
                                    "ITEM STATUS",
                                ].map((header) => (
                                    <TableHead
                                        key={header}
                                        className="py-2 px-4 border-b"
                                    >
                                        {header}
                                    </TableHead>
                                ))}
                                <TableHead className="py-2 px-4 border-b">
                                    ACTIONS
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row, index) =>
                                renderFormFields(row, index)
                            )}
                        </TableBody>
                    </Table>
                    <Button type="button" onClick={handleAddRow}>
                        <Plus className="h-4 w-4" /> Add Row
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
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
