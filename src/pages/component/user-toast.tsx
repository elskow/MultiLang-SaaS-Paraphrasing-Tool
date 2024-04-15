import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const TOAST_DISPLAY_DURATION = 2000

const UserToast = () => {
    const { data: session } = useSession()
    const [isVisible, setIsVisible] = useState(false)
    const [isMounted, setIsMounted] = useState(true)

    useEffect(() => {
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, TOAST_DISPLAY_DURATION)

        const unmountTimer = setTimeout(() => {
            setIsMounted(false)
        }, TOAST_DISPLAY_DURATION + 500)

        return () => {
            clearTimeout(timer)
            clearTimeout(unmountTimer)
        }
    }, [])

    const userName = session?.user?.name || "Guest"

    const baseClass =
        "fixed inset-x-0 bottom-10 flex items-center justify-center pointer-events-none select-none sm:p-6 sm:items-center sm:justify-center mb-4 transition-all duration-500 ease-in-out"
    const visibilityClass = isVisible
        ? "opacity-100 transform translate-y-0"
        : "opacity-0 transform translate-y-10"

    if (!isMounted) {
        return null
    }

    return (
        <div className={`${baseClass} ${visibilityClass}`}>
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center">
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-gray-900">
                                Welcome {userName} 🎉
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserToast
