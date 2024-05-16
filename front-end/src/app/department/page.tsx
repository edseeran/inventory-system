"use client";

import ProtectedRoute from "@/components/protectedroute";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

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
import { Department, columns } from "@/app/department/columns";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import Test from "@/components/test";

async function getData() {
    const res = await fetch("http://127.0.0.1:8000/api/department/index", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

// async function createDepartment(values: z.infer<typeof formSchema>) {
//     const res = await fetch("http://127.0.0.1:8000/api/department/create", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },

//         body: JSON.stringify(values),
//     });

//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error("Failed to create department");
//     }
//     // router.refresh();
//     return res.json();
// }

const choices = [
    {
        value: "ACADEMIC",
        label: "Academic",
    },
    {
        value: "NON-ACADEMIC",
        label: "Non-Academic",
    },
];

const formSchema = z
    .object({
        departmentCode: z.string().min(2, {
            message: "Department code must be at least 2 characters.",
        }),
        departmentName: z.string().min(4, {
            message: "Department name must be at least 4 characters.",
        }),
        departmentType: z.string().min(1, {
            message: "Please select a department type.",
        }),
    })
    .required();

function DepartmentPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [departments, setDepartments] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            departmentCode: "",
            departmentName: "",
            departmentType: "",
        },
    });

    const createDepartment = async (values: z.infer<typeof formSchema>) => {
        const res = await fetch("http://127.0.0.1:8000/api/department/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            throw new Error("Failed to create department");
        }

        const data = await res.json();

        // router.refresh();
        // router.push("/department");

        // const dataIndex = await getData();
        // setDepartments(dataIndex.results);

        toast({
            title: data.message,
            description: new Date().toLocaleString(),
        });

        console.log(data);

        setTimeout(() => {
            window.location.reload();
        }, 3000);

        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                setDepartments(data.results);
            } catch (error) {
                console.error("Fetch data error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold text-left">Departments</h1>

                {/* Create Department Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Create Department</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Department</DialogTitle>
                            <DialogDescription>
                                Fill in the form below to create a new
                                department.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(
                                        createDepartment
                                    )}
                                >
                                    <FormField
                                        control={form.control}
                                        name="departmentCode"
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
                                        name="departmentName"
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                                    Department Name
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
                                        name="departmentType"
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                                    Department Type
                                                </FormLabel>
                                                <FormControl>
                                                    {/* <Input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        placeholder="Username"
                                                        {...field}
                                                        value='test'
                                                    /> */}
                                                    {/* <ComboBox
                                                        choices={choices}
                                                        {...field}
                                                    /> */}
                                                    <ComboBox
                                                        choices={choices}
                                                        value={form.getValues(
                                                            "departmentType"
                                                        )}
                                                        onChange={(value) =>
                                                            form.setValue(
                                                                "departmentType",
                                                                value
                                                            )
                                                        }
                                                    />

                                                    {/* <Test {...field} /> */}
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

            <DataTable columns={columns} data={departments} />
        </div>
    );
}

// export default DepartmentPage;
export default ProtectedRoute(DepartmentPage);
