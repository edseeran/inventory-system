"use client";

import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { columns, Inventory } from "./columns";
import { set } from "react-hook-form";

const getInventoryData = async ($inventoryFormReferenceNumber: string) => {
    const inventoryFormReferenceNumber = $inventoryFormReferenceNumber;
    try {
        const res = await fetch(
            `http://127.0.0.1:8000/api/inventory-form/index/${inventoryFormReferenceNumber}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch inventory data");
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

const InventoryPage = () => {
    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);

    useEffect(() => {
        const fetchInventoryData = async () => {
            const data = await getInventoryData("all");
            setInventoryData(data.results);
        };

        fetchInventoryData();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-left">Inventory</h1>
            <DataTable columns={columns} data={inventoryData} />
        </div>
    );
};

export default InventoryPage;
