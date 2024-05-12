"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import Link from "next/link";

const getDepartmentPage = async (departmentReferenceNumber: string) => {
    return await fetch(
        `http://127.0.0.1:8000/api/department/show/${departmentReferenceNumber}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    ).then((res) => res.json());
};

interface Department {
    id: number;
    departmentReferenceNumber: string;
    userId?: number;
    departmentCode: string;
    departmentName: string;
    departmentType: string;
}

const OneDepartmentPage = ({ params }: { params: { id: string } }) => {
    const [department, setDepartment] = useState<Department | null>(null);

    useEffect(() => {
        getDepartmentPage(params.id)
            .then((data) => setDepartment(data.results))
            .catch((error) => console.error(error));
    }, [params.id]);

    if (!department) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-end">
                            <Button variant="outline">
                                <Link href="/department">back</Link>
                            </Button>
                        </div>
                        {department.departmentName}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        <p>Department ID: {department.id}</p>
                        <p>
                            Department Reference Number:{" "}
                            {department.departmentReferenceNumber}
                        </p>
                        <p>Department Code: {department.departmentCode}</p>
                        <p>Department Type: {department.departmentType}</p>
                    </CardDescription>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </div>
    );
};

export default OneDepartmentPage;
