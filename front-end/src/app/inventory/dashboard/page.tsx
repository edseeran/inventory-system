"use client";

import ProtectedRoute from "@/components/protectedroute";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { Inventory, columns } from "@/app/inventory/dashboard/columns";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import Test from "@/components/test";

async function getData() {
    const res = await fetch("http://127.0.0.1:8000/api/inventory-form/list", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const InventoryPage = () => {
    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);

    useEffect(() => {
        const fetchInventoryData = async () => {
            const data = await getData();
            setInventoryData(data.results);
        };

        fetchInventoryData();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-left">Inventory List</h1>
            <DataTable columns={columns} data={inventoryData} />
        </div>
    );
};

const choicesFacilityType = [
    {
        value: "LABORATORY",
        label: "LABORATORY",
    },
    {
        value: "CLASSROOM",
        label: "CLASSROOM",
    },
    {
        value: "OFFICE",
        label: "OFFICE",
    },
    {
        value: "OTHERS",
        label: "OTHERS",
    },
];

const choicesItemStatus = [
    {
        value: "WORKING",
        label: "W",
    },
    {
        value: "NOT WORKING",
        label: "NW",
    },
    {
        value: "FOR REPAIR",
        label: "FR",
    },
    {
        value: "FOR CALIBRATION",
        label: "FC",
    },
];

const formSchema = z
    .object({
        department: z.string().min(2, {
            message: "Department must be at least 2 characters.",
        }),
        // facilityType: z.enum(["LABORATORY", "CLASSROOM", "OFFICE", "OTHERS"]),
        facilityType: z.string(),
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

function InventoryFormPage() {
    const router = useRouter();
    const [inventoryForm, setInventoryForm] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

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

    const createInventoryForm = async (values: z.infer<typeof formSchema>) => {
        const res = await fetch(
            "http://127.0.0.1:8000/api/inventory-form/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
            }
        );

        if (!res.ok) {
            throw new Error("Failed to create inventory form");
        }
        window.location.reload();

        const json = await res.json();

        // router.refresh();
        // router.push("/department");

        const data = await getData();
        setInventoryForm(data.results);

        return json;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                setInventoryForm(data.results);
            } catch (error) {
                console.error("Fetch data error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold text-left">Inventory Form</h1>

                {/* Create Inventory Form Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Create Inventory Form</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Inventory Form</DialogTitle>
                            <DialogDescription>
                                Fill in the form below to create a new Inventory
                                Form.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(
                                        createInventoryForm
                                    )}
                                >
                                    <FormField
                                        control={form.control}
                                        name="department"
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                                    Department Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        placeholder=""
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-gray-600 text-xs italic"></FormDescription>
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="facilityType"
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                                    FACILITY TYPE
                                                </FormLabel>
                                                <FormControl>
                                                    <ComboBox
                                                        choices={
                                                            choicesFacilityType
                                                        }
                                                        value={form.getValues(
                                                            "facilityType"
                                                        )}
                                                        onChange={(value) =>
                                                            form.setValue(
                                                                "facilityType",
                                                                value
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-gray-600 text-xs italic"></FormDescription>
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="item"
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                                    ITEM
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        placeholder=""
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-gray-600 text-xs italic"></FormDescription>
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                                    AMOUNT
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        placeholder=""
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-gray-600 text-xs italic"></FormDescription>
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    <DialogFooter>
                                        <Button type="submit">
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <DataTable columns={columns} data={inventoryForm} />
        </div>
    );
}

export default InventoryPage;
