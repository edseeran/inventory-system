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

const Login = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeNumber: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                localStorage.setItem("token", data.token);
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
        <div className="flex items-center justify-center bg-gray-100 px-4  dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Or
                        <a
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            href="#"
                        >
                            start your 14-day free trial
                        </a>
                    </p>
                </div>
                <Form
                    {...form}
                    className="space-y-6"
                    // onSubmit={form.handleSubmit(onSubmit)}
                >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="employeeNumber"
                            render={({ field }) => (
                                <div>
                                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Employee Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <div>
                                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-800 dark:focus:ring-indigo-400"
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                />
                                <label
                                    className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                                    htmlFor="remember-me"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    href="#"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <Button
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800"
                            type="submit"
                        >
                            Sign in
                        </Button>
                    </form>
                </Form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-100 px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800"
                        type="button"
                    >
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        <span className="ml-2">Twitter</span>
                    </button>
                    <button
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800"
                        type="button"
                    >
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                clipRule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                fillRule="evenodd"
                            />
                        </svg>
                        <span className="ml-2">GitHub</span>
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 z-[-1] bg-[url('/subtle-pattern.svg')] bg-repeat opacity-10 dark:opacity-20" />
        </div>
    );
};

export default Login;
