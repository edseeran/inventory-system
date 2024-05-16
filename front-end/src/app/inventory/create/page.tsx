"use client";

import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
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
    datePurchased: Date;
    amount: number;
    dateIssued: Date;
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

const DepartmentChoices = async () => {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/department/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

const DynamicTable = () => {
    const { toast } = useToast();
    const [departmentChoices, setDepartmentChoices] = useState([]);
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

    useEffect(() => {
        DepartmentChoices().then((data) => setDepartmentChoices(data.results));
    }, []);

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
                        <TableCell
                            key={key}
                            className="py-2 px-2 md:px-4 border-b"
                        >
                            <FormField
                                control={form.control}
                                name={`rows.${index}.${key}`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-xs md:text-base">
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full md:w-[150px] pl-3 text-left font-normal",
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
                        <TableCell
                            key={key}
                            className="py-2 px-2 md:px-4 border-b"
                        >
                            <FormField
                                control={form.control}
                                name={`rows.${index}.${key}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs md:text-base">
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </FormLabel>
                                        <FormControl>
                                            <ComboBox
                                                choices={ItemStatusChoices}
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="w-full md:w-[100px]"
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
                    <TableCell key={key} className="py-2 px-2 md:px-4 border-b">
                        <FormField
                            control={form.control}
                            name={`rows.${index}.${key}`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs md:text-base">
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
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TableCell>
                );
            })}
            <TableCell className="py-2 px-2 md:px-4 border-b">
                <Button type="button" onClick={() => handleSubtractRow(index)}>
                    <Minus className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    );

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

                toast({
                    title: data.message,
                    description: new Date().toLocaleString(),
                    // children: window.location.reload();
                });

                console.log(data);
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.log(error);

            toast({
                variant: "destructive",
                title: "An error occurred",
                description: new Date().toLocaleString(),
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-wrap justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-1/3">
                                <FormLabel className="text-xs md:text-base">
                                    Department
                                </FormLabel>
                                <FormControl>
                                    <ComboBox
                                        choices={departmentChoices}
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="facilityType"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-1/3">
                                <FormLabel className="text-xs md:text-base">
                                    Facility Type
                                </FormLabel>
                                <FormControl>
                                    <ComboBox
                                        choices={FacilityTypeChoices}
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="asOfDate"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-1/3">
                                <FormLabel className="text-xs md:text-base">
                                    As Of Date
                                </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
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
                                                        <span>Pick a date</span>
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
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table className="min-w-full bg-white border border-gray-300 table-auto">
                        <TableCaption className="p-2">
                            Dynamic Table
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                {[
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
                                        className="py-2 px-2 md:px-4 border-b"
                                    >
                                        {header}
                                    </TableHead>
                                ))}
                                <TableHead className="py-2 px-2 md:px-4 border-b">
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
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            type="button"
                            onClick={handleAddRow}
                            className="flex items-center"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add Row
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default function TestPage() {
    return (
        <div className="p-4 md:p-8">
            <DynamicTable />
        </div>
    );
}
