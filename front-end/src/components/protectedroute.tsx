import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute(Component) {
    return () => {
        const router = useRouter();
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
            }
        }, []);

        return <Component />;
    };
}