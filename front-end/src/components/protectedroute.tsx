import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute(Component: any) {
    const WrappedComponent = () => {
        const router = useRouter();
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
            }
        }, []);

        return <Component />;
    };

    WrappedComponent.displayName = `ProtectedRoute(${
        Component.displayName || Component.name || "Component"
    })`;

    return WrappedComponent;
}
