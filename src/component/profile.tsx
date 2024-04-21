import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"

const Profile = () => {
    const { data: session } = useSession()

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                {session?.user?.image ? (
                    <Avatar
                        src={session.user.image}
                        as="button"
                        className="transition-transform"
                        color="primary"
                        name={session.user.name || "User"}
                        size="sm"
                    />
                ) : (
                    <Avatar
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name="User"
                        size="sm"
                    />
                )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{session?.user?.email}</p>
                </DropdownItem>
                <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => signOut()}
                >
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default Profile
