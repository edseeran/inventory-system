import React from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NavBar = () => {
    return (
        <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950">
            <div className="flex items-center gap-4">
                <Link className="flex items-center gap-2" href="#">
                    <MountainIcon className="h-6 w-6" />
                    <span className="text-lg font-semibold">
                        SPCF Inventory Management System
                    </span>
                </Link>
                <nav className="hidden lg:flex items-center gap-4">
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
                </nav>
            </div>
            <div className="relative w-full max-w-md lg:max-w-lg">
                <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                    className="w-full rounded-md bg-gray-100 pl-10 pr-4 py-2 text-sm focus:bg-white focus:outline-none dark:bg-gray-800 dark:text-gray-50 dark:focus:bg-gray-700"
                    placeholder="Search products..."
                    type="search"
                />
            </div>
            <Button className="lg:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
            </Button>
        </header>
    );
};

function MountainIcon(props) {
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

function SearchIcon(props) {
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

function MenuIcon(props) {
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
