import { AppContext } from "@/AppContextProvider"
import { LANGUAGE } from "@/Const"
import { useContext, useEffect, useState } from "react"

const LanguageDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { language: selectedLanguage, setLanguage } = useContext(AppContext)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (isClient) {
            setLanguage(
                localStorage.getItem("selectedLanguage") ||
                    (LANGUAGE.length > 0 ? LANGUAGE[0] : ""),
            )
        }
    }, [isClient, setLanguage])

    const handleDropdownClick = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (lang: string) => {
        setLanguage(lang)
        setIsOpen(false)
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedLanguage", lang)
        }
    }

    return (
        <div className="relative inline-block text-left select-none">
            <div>
                <button
                    type="button"
                    onClick={handleDropdownClick}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-sky-500 focus:ring-opacity-25 transition duration-200 ease-in-out"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                >
                    {selectedLanguage}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-in-out ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-0 -translate-y-2 opacity-0"} z-10`}
            >
                <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    {LANGUAGE.map((lang) => (
                        <a
                            key={lang}
                            onClick={() => handleOptionClick(lang)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            {lang}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LanguageDropdown
