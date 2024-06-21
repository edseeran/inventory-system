// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

// import { Rubik } from "next/font/google";
// import "./styles.css";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};
