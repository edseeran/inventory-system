"use client";

import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { columns, Inventory } from "./columns";
import { set } from "react-hook-form";

async function getInventoryData() {
    const res = await fetch("http://127.0.0.1:8000/api/inventory-form/list", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const InventoryPage = () => {
    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);

    useEffect(() => {

        const fetchInventoryData = async () => {
            const data = await getInventoryData();
            setInventoryData(data.results);
        };

        fetchInventoryData();

    }, []);

    return (
        
        <div>
            <h1 className="text-2xl font-bold text-left">Inventory List</h1>
            <DataTable columns={columns} data={inventoryData} />
        </div>
    );
};

export default InventoryPage;
