import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5"

const Profile = () => {
    const { data: session } = useSession()

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleDropdownClick = () => {
        setIsOpen(!isOpen)
    }

    const handleOutsideClick = (e: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [])

    return (
        <div ref={dropdownRef} className="relative select-none">
            <button title="Profile" type="button" onClick={handleDropdownClick}>
                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                        loading={"lazy"}
                        unselectable={"on"}
                        draggable={"false"}
                    />
                ) : (
                    <IoPersonCircleOutline className="text-5xl text-white rounded-full" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-40 bg-white ring-3 ring-slate-300 rounded-md md:w-48 shadow-lg transition-all duration-200 ease-in-out p-2 w-40">
                    <div
                        className="py-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <p
                            className="block px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full transition-colors duration-200 select-none cursor-pointer"
                            role="menuitem"
                            onClick={() => signOut()}
                            draggable={"false"}
                        >
                            Logout{" "}
                            <IoLogOutOutline className="inline text-lg" />
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
