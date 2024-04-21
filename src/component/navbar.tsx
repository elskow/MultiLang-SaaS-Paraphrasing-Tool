import Profile from "@/component/profile"
import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Nav() {
    const { data: session } = useSession()

    return (
        <Navbar className={`py-2`}>
            <NavbarBrand>
                <Link
                    href="/public"
                    style={{ display: "flex", alignItems: "start" }}
                >
                    <Image
                        src="/logo.png"
                        alt="ParaFaze"
                        width={40}
                        height={40}
                        className={`rounded-xl`}
                    />
                    <p
                        className={`font-bold text-slate-800 pt-2 md:text-sm lg:text-base text-inherit pl-3 transition-all duration-300 ease-in-out align-text-top flex place-items-start`}
                    >
                        ParaFaze
                    </p>
                </Link>
            </NavbarBrand>
            <NavbarContent justify={`end`}>
                {session ? (
                    <div>
                        <Profile />
                    </div>
                ) : (
                    <Button
                        variant={`light`}
                        color={`default`}
                        className={`bg-blue-100 bg-opacity-25 text-white`}
                    >
                        <Link
                            href="/login"
                            className="text-xs md:text-sm font-semibold"
                        >
                            Login
                        </Link>
                    </Button>
                )}
            </NavbarContent>
        </Navbar>
    )
}
