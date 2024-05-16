"use client";
import React from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
    const router = useRouter();

    async function logout() {
        const res = await fetch("http://127.0.0.1:8000/api/account/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            },
        });

        if (res.ok) {
            localStorage.removeItem("token");
            router.push("/login");
        }
        return res;
    }

    return (
        <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950">
            <div className="flex items-center gap-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="lg:hidden"
                            size="icon"
                            variant="ghost"
                        >
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="flex flex-col gap-4 p-4">
                            <Link className="flex items-center gap-2" href="#">
                                <MountainIcon className="h-6 w-6" />
                                <span className="text-lg font-semibold">
                                    SPCF Inventory System
                                </span>
                            </Link>
                            <nav className="space-y-2">
                                <Link
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                    href="/"
                                >
                                    {/* <HomeIcon className="h-5 w-5" /> */}
                                    Home
                                </Link>
                                <Link
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                    href="/department"
                                >
                                    {/* <PackageIcon className="h-5 w-5" /> */}
                                    Department
                                </Link>
                                <Link
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                    href="/inventory"
                                >
                                    {/* <UsersIcon className="h-5 w-5" /> */}
                                    Inventory
                                </Link>
                                <Link
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                    href="#"
                                >
                                    {/* <MailIcon className="h-5 w-5" /> */}
                                    Contact
                                </Link>
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
                <Link
                    className="flex items-center gap-2 hidden lg:flex"
                    href="#"
                >
                    <MountainIcon className="h-6 w-6" />
                    <span className="text-lg font-semibold">
                        SPCF Inventory System
                    </span>
                </Link>
                {/* <nav className="hidden lg:flex items-center gap-4">
                    <Link
                        className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        href="#"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        href="#"
                    >
                        Products
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        href="#"
                    >
                        About
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                        href="#"
                    >
                        Contact
                    </Link>
                </nav> */}
            </div>
            <div className="flex items-center gap-4 mr-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="rounded-full"
                            size="icon"
                            variant="ghost"
                        >
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>E</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                logout();
                            }}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

export default NavBar;
