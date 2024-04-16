import { useParaphrasingStore } from "@/store/paraphrasingStore"
import { UsageType } from "@/type/UsageType"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const activeUsageButton =
    "bg-red-600 hover:bg-red-800 transition duration-500 ease-in-out"
const inactiveUsageButton =
    "bg-gray-400 hover:bg-gray-600 transition duration-500 ease-in-out"

const UsageTypeButton = () => {
    const { data: session } = useSession()
    const { usageType, setUsageType, setInput, setOutput } =
        useParaphrasingStore()

    const handleButtonClick = (buttonName: string) => {
        setUsageType(buttonName as UsageType)
        setInput("")
        setOutput("")
        localStorage.setItem("cachedUsageType", buttonName)
    }

    useEffect(() => {
        const cachedUsageType = localStorage.getItem("cachedUsageType")
        if (cachedUsageType && session) {
            setUsageType(cachedUsageType as UsageType)
        }
    }, [setUsageType, session])

    return (
        <>
            {Object.values(UsageType).map((buttonName) => {
                const buttonDisabled = buttonName === "Premium" && !session

                return (
                    <button
                        key={buttonName}
                        title={buttonName}
                        type="button"
                        className={`md:px-4 md:py-2 px-2 py-1 select-none rounded-lg text-white font-semibold shadow-md  transition-all duration-300 ease-in-out ${
                            usageType === buttonName
                                ? activeUsageButton
                                : inactiveUsageButton
                        } ${
                            buttonDisabled
                                ? "bg-opacity-20 hover:bg-opacity-20 cursor-not-allowed"
                                : ""
                        }`}
                        onClick={() => handleButtonClick(buttonName)}
                        disabled={buttonDisabled}
                    >
                        {buttonName}
                    </button>
                )
            })}
        </>
    )
}

export default UsageTypeButton
