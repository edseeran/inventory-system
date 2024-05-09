/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pnihgm7pf2m
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";

export default function Component() {
    return (
        <>
            <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950">
                <div className="flex items-center gap-4">
                    <Link className="flex items-center gap-2" href="#">
                        <MountainIcon className="h-6 w-6" />
                        <span className="text-lg font-semibold">Acme Inc</span>
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
            <div className="flex min-h-screen">
                <div className="hidden w-64 shrink-0 border-r bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900 lg:block">
                    <div className="flex h-full flex-col justify-between">
                        <nav className="space-y-2">
                            <Link
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                href="#"
                            >
                                <HomeIcon className="h-5 w-5" />
                                Home
                            </Link>
                            <Link
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                href="#"
                            >
                                <PackageIcon className="h-5 w-5" />
                                Products
                            </Link>
                            <Link
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                href="#"
                            >
                                <UsersIcon className="h-5 w-5" />
                                About
                            </Link>
                            <Link
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800"
                                href="#"
                            >
                                <MailIcon className="h-5 w-5" />
                                Contact
                            </Link>
                        </nav>
                        <Button
                            className="self-end"
                            size="icon"
                            variant="outline"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle sidebar</span>
                        </Button>
                    </div>
                </div>
                <main className="flex-1 p-4 lg:p-6">
                    <div className="border rounded-lg w-full">
                        <div className="relative w-full overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Invoice
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            INV001
                                        </TableCell>
                                        <TableCell>Paid</TableCell>
                                        <TableCell>Credit Card</TableCell>
                                        <TableCell className="text-right">
                                            $250.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            INV002
                                        </TableCell>
                                        <TableCell>Pending</TableCell>
                                        <TableCell>PayPal</TableCell>
                                        <TableCell className="text-right">
                                            $150.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            INV003
                                        </TableCell>
                                        <TableCell>Unpaid</TableCell>
                                        <TableCell>Bank Transfer</TableCell>
                                        <TableCell className="text-right">
                                            $350.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            INV004
                                        </TableCell>
                                        <TableCell>Paid</TableCell>
                                        <TableCell>Credit Card</TableCell>
                                        <TableCell className="text-right">
                                            $450.00
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            INV005
                                        </TableCell>
                                        <TableCell>Paid</TableCell>
                                        <TableCell>PayPal</TableCell>
                                        <TableCell className="text-right">
                                            $550.00
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

function ChevronLeftIcon(props) {
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
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function HomeIcon(props) {
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function MailIcon(props) {
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

function PackageIcon(props) {
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
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
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

function UsersIcon(props) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
