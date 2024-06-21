import spcflogo from "../assets/SPCF.png";
import backgroundImage from "../assets/spcfbg.jpg";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <>
            <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        filter: "blur(6px) brightness(-)",
                        zIndex: -1,
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div>
                        <img
                            src={spcflogo}
                            alt="Acme Inc"
                            width="48"
                            height="48"
                            className="mx-auto h-48 w-48"
                            // style="aspect-ratio: 48 / 48; object-fit: cover;"
                            style={{
                                aspectRatio: 250 / 500,
                                objectFit: "cover",
                            }}
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#ffffff]">
                            <span className="font-bold">Sign in</span> to your
                            account
                        </h2>
                        <p className="mt-2 text-center text-sm text-[#ac8a36]">
                            Or{" "}
                            <Link
                                className="font-medium text-[#f0c14b] hover:text-[#f0c14b]/80"
                                to="#"
                            >
                                register for a new account
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    for="email"
                                >
                                    Email address
                                </label>
                                <input
                                    className="mb-2 h-10 rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-t-md border border-[#a7abb1] bg-[#ffffff] px-3 py-2 text-[#ffffff] placeholder-[#f0c14b] focus:z-10 focus:border-[#f0c14b] focus:outline-none focus:ring-[#f0c14b] sm:text-sm"
                                    id="email"
                                    autocomplete="email"
                                    required=""
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    fdprocessedid="usapz"
                                />
                            </div>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    for="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="h-10 rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-b-md border border-[#a7abb1] bg-[#ffffff] px-3 py-2 text-[#ffffff] placeholder-[#f0c14b] focus:z-10 focus:border-[#f0c14b] focus:outline-none focus:ring-[#f0c14b] sm:text-sm"
                                    id="password"
                                    autocomplete="current-password"
                                    required=""
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    fdprocessedid="fp2yko"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    role="checkbox"
                                    aria-checked="false"
                                    data-state="unchecked"
                                    value="on"
                                    className="border-white peer shrink-0 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 rounded text-[#f0c14b] focus:ring-[#f0c14b]"
                                    id="remember-me"
                                    fdprocessedid="mhs809"
                                ></button>
                                <input
                                    aria-hidden="true"
                                    tabindex="-1"
                                    type="checkbox"
                                    value="on"
                                    name="remember-me"
                                    style={{
                                        transform: "translateX(-100%)",
                                        position: "absolute",
                                        pointerEvents: "none",
                                        opacity: 0,
                                        margin: 0,
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                                <label
                                    className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 block text-sm text-[#f0c14b]"
                                    for="remember-me"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link
                                    className="font-medium text-[#f0c14b] hover:text-[#f0c14b]/80"
                                    to="#"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                className="items-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-[#f0c14b] py-2 px-4 text-sm font-medium text-[#0c1b33] transition-colors hover:bg-[#f0c14b]/90 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] focus:ring-offset-2"
                                type="submit"
                            >
                                <h1 className="font-bold">Sign Up</h1>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
