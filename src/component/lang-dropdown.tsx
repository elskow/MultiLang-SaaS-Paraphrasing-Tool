import { useParaphrasingStore } from "@/store/paraphrasingStore"
import { LanguageType } from "@/type/LanguageType"
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import { useEffect, useState } from "react"

const LanguageDropdown = () => {
    const { language: selectedLanguage, setLanguage } = useParaphrasingStore()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (isClient) {
            setLanguage(
                (localStorage.getItem("selectedLanguage") as LanguageType) ||
                    LanguageType.English,
            )
        }
    }, [isClient, setLanguage])

    const handleOptionClick = (lang: string) => {
        setLanguage(lang as LanguageType)
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedLanguage", lang)
        }
    }

    return (
        <Dropdown placement={`bottom-end`} className={`font-bold`}>
            <DropdownTrigger>
                <Button variant="bordered" color={"primary"}>
                    {selectedLanguage}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Language Selection"
                selectionMode="single"
                selectedKeys={[selectedLanguage]}
            >
                {Object.values(LanguageType).map((lang) => (
                    <DropdownItem
                        key={lang}
                        onClick={() => handleOptionClick(lang)}
                    >
                        {lang}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default LanguageDropdown
