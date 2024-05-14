"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import Link from "next/link";

const getInventoryFormPage = async (inventoryFormReferenceNumber: string) => {
    return await fetch(
        `http://127.0.0.1:8000/api/inventory-form/index/${inventoryFormReferenceNumber}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    ).then((res) => res.json());
};

interface InventoryForm {
    id: number;
    inventoryFormReferenceNumber: string;
    itemReferenceNumber: string;
    userId?: number;
    facilityType: string;
    otherFacilityType?: string;
    departmentId: number;
    asOfDate: string;
    item: string;
    brand: string;
    quantity: string;
    itemSerialNumber: string;
    datePurchased: string;
    amount: string;
    dateIssued: string;
    itemStatus: string;
}

const OneInventoryFormPage = ({ params }: { params: { id: string } }) => {
    const [inventoryForm, setInventoryForm] = useState<InventoryForm | null>(null);
    useEffect(() => {
        getInventoryFormPage(params.id)
            .then((data) => setInventoryForm(data.results))
            .catch((error) => console.error(error));
    }, [params.id]);

    if (!inventoryForm) {
        return <div>Loading...</div>;
    }

    return (
        <div>
           <Table>
            <TableCaption>Inventory Details</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>REFERENCE NUMBER</TableHead>
                <TableHead>FACILITY TYPE</TableHead>
                <TableHead>OTHER FACILITY TYPE</TableHead>
                <TableHead>DEPARTMENT ID</TableHead>
                <TableHead>AS OF DATE</TableHead>
                <TableHead>ITEM</TableHead>
                <TableHead>BRAND</TableHead>
                <TableHead>QUANTITY</TableHead>
                <TableHead>ITEM SERIAL NUMBER</TableHead>
                <TableHead>DATE PURCHASED</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>DATE ISSUED</TableHead>
                <TableHead>ITEM STATUS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inventoryForm.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.inventoryFormReferenceNumber}</TableCell>
                    <TableCell>{item.facilityType}</TableCell>
                    <TableCell>{item.otherFacilityType}</TableCell>
                    <TableCell>{item.departmentId}</TableCell>
                    <TableCell>{item.asOfDate}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.itemSerialNumber}</TableCell>
                    <TableCell>{item.datePurchased}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.dateIssued}</TableCell>
                    <TableCell>{item.itemStatus}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    );
};

export default OneInventoryFormPage;
