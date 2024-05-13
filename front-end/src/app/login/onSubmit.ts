import { z } from "zod";
import { cookies } from "next/headers";
// import { useRouter } from "next/router";



export async function OnSubmit(values: z.infer<typeof formSchema>) {
    const router = useRouter();
    try {
        const res = await fetch("http://127.0.0.1:8000/api/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            localStorage.setItem("token", data.token);
            cookies;
            const cookieStore = cookies().set("token", data.token, {
                // path: "/",
                // maxAge: 60 * 60 * 24 * 7,
            });
            console.log(cookieStore);

            router.push("/");
        }
    } catch (error) {
        console.log(error);
    }
}
