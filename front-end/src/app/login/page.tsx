"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";
import { useState } from "react";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import { headers } from "next/headers";

const formSchema = z.object({
    employeeNumber: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
    }),
});

import { OnSubmit } from "./onSubmit";
import { NextResponse } from "next/server";

const Login = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeNumber: "",
            password: "",
        },
    });

    // const onSubmit = form.handleSubmit(async (values) => {
    //     OnSubmit(values);
    // });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // try {
        //     const response = await axios.post(
        //         "http://127.0.0.1:8000/api/account/login",
        //         {
        //             employeeNumber: values.employeeNumber,
        //             password: values.password,
        //             // headers: {
        //             //     "Content-Type": "application/json",
        //             // },
        //         }
        //     );

        //     if (response.data.token) {
        //         // Store the access token in local storage (or some other secure place)
        //         localStorage.setItem("token", response.data.token);
        //         // Navigate to the home page, or wherever you want to redirect the user to after they log in
        //         router.push("/");
        //     } else {
        //         // Handle error: show a message to the user, log the error, etc.
        //     }
        // } catch (error) {
        //     // Handle error: show a message to the user, log the error, etc.
        // }
        try {
            const res = await fetch("http://127.0.0.1:8000/api/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                localStorage.setItem("token", data.token);
                // cookies
                // const cookieStore = cookies().set("token", data.token, {
                //     // path: "/",
                //     // maxAge: 60 * 60 * 24 * 7,
                // });
                // console.log(cookieStore);

                let response = NextResponse.next();
                response.cookies.set("token", data.token);
                console.log(response.cookies);

                console.log(response.cookies.get("token"));

                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full max-w-xs mx-auto mt-20">
            <Form
                {...form}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="employeeNumber"
                        render={({ field }) => (
                            <div className="mb-4">
                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                    Employee Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-600 text-xs italic">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <div className="mb-6">
                                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        )}
                    />
                    <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;
