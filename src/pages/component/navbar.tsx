import Profile from "@/pages/component/profile"
import UserToast from "@/pages/component/user-toast"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export default function Navbar() {
    const { data: session } = useSession()

    useEffect(() => {
        if (session) {
            setTimeout(() => {
                return <UserToast />
            }, 6000)
        }
    })

    return (
        <>
            <nav className="bg-sky-900 w-full px-4 py-4 md:px-8 drop-shadow-xl select-none">
                <div
                    className={`lg:max-w-6xl mx-auto flex items-center justify-between`}
                >
                    <Link
                        className="flex justify-between gap-2 items-start p-2 hover:text-slate-700 transition duration-200 ease-in-out"
                        href={"/"}
                        unselectable={"on"}
                        draggable={"false"}
                    >
                        <Image
                            src="/logo.png"
                            alt="Pharaprase"
                            width={50}
                            height={50}
                            className="md:w-10 md:h-10 h-10 w-10"
                        />
                        <p
                            className={`font-bold text-slate-200 pt-2 md:text-lg lg:text-xl`}
                        >
                            ParaFaze
                        </p>
                    </Link>

                    {session ? (
                        <div>
                            <Profile />
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-lg text-slate-200 md:py-2 py-1 md:font-bold md:text-base text-sm font-semibold
                        hover:text-white transition-all duration-300 ease-in-out px-6 md:px-8"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>
            {session && <UserToast />}
        </>
    )
}
