import React, { useState } from "react"

interface IContext {
    usageType: string
    setUsageType: React.Dispatch<React.SetStateAction<string>>
    input: string
    setInput: React.Dispatch<React.SetStateAction<string>>
    output: string
    setOutput: React.Dispatch<React.SetStateAction<string>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    language: string
    setLanguage: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = React.createContext<IContext>({
    usageType: "Standard",
    setUsageType: () => {},
    input: "",
    setInput: () => {},
    output: "",
    setOutput: () => {},
    isLoading: false,
    setIsLoading: () => {},
    language: "",
    setLanguage: () => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [usageType, setUsageType] = useState<string>("Standard")
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [language, setLanguage] = useState<string>("English")

    return (
        <AppContext.Provider
            value={{
                usageType,
                setUsageType,
                input,
                setInput,
                output,
                setOutput,
                isLoading,
                setIsLoading,
                language,
                setLanguage,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
