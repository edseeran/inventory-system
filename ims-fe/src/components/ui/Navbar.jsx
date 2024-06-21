/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CEhHcq3R0Vz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";

export default function Component() {
    return (
        <header className="flex items-center justify-between h-16 px-6 bg-background border-b">
            <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
                prefetch={false}
            >
                <MountainIcon className="w-6 h-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
                <Link
                    to="#"
                    className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                >
                    Dashboard
                </Link>
                <Link
                    to="#"
                    className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                >
                    About
                </Link>
                <Link
                    to="#"
                    className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                >
                    Services
                </Link>
                <Link
                    to="#"
                    className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                    prefetch={false}
                >
                    Contact
                </Link>
            </nav>
        </header>
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
