import { signIn, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BiLeftArrowAlt } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"

const LoginPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    if (session) {
        router.push("/")
    }

    return (
        <>
            <Head>
                <title>ParaFaze - Login</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <main className="bg-slate-100 min-h-screen flex flex-col items-center justify-center pb-16">
                <div className="rounded-3xl bg-white shadow-md w-fit mx-4 py-5 px-12 md:px-24 mb-6">
                    <div className="flex flex-col p-6">
                        <Image
                            alt="logo"
                            loading="lazy"
                            width="100"
                            height="100"
                            decoding="async"
                            data-nimg="1"
                            className="mx-auto mb-10 -mt-24"
                            src={`/logo.png`}
                        />
                        <h3 className="font-bold tracking-tight text-lg md:text-2xl text-center mb-4">
                            Welcome Back !
                        </h3>
                        <p className="text-xs md:text-sm text-center mb-4">
                            Log in to continue access to ParaFaze
                        </p>
                    </div>
                    <div className="space-y-2 flex flex-col items-center mb-6 select-none">
                        <button
                            onClick={() =>
                                signIn("google", {
                                    callbackUrl: `${window.location.origin}`,
                                })
                            }
                            className="inline-flex items-center justify-center rounded-xl text-xs md:text-sm font-medium transition-all active:scale-95 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 py-4 bg-sky-100 px-4 md:px-8 hover:bg-sky-200 transform duration-500 ease-in-out active:bg-sky-300"
                        >
                            <FcGoogle className={`mr-6 text-lg`} />
                            Login With Google
                        </button>
                    </div>
                </div>
                <Link
                    href={"/"}
                    className={`inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 text-sm`}
                >
                    <BiLeftArrowAlt /> Back to Home
                </Link>
            </main>
        </>
    )
}

export default LoginPage
