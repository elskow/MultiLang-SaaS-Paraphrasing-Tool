import { LanguageType } from "@/type/LanguageType"
import { UsageType } from "@/type/UsageType"
import { create } from "zustand"

export type ParaphrasingStore = {
    input: string
    setInput: (input: string) => void

    output: string
    setOutput: (output: string) => void

    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void

    language: LanguageType
    setLanguage: (language: LanguageType) => void

    usageType: UsageType
    setUsageType: (usageType: UsageType) => void

    postParaphraseText: () => Promise<void>
}

export const useParaphrasingStore = create<ParaphrasingStore>((set) => ({
    input: "",
    setInput: (input) => set({ input }),

    output: "",
    setOutput: (output) => set({ output }),

    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),

    language: LanguageType.English,
    setLanguage: (language) => set({ language }),

    usageType: UsageType.Standard,
    setUsageType: (usageType) => set({ usageType }),

    postParaphraseText: async () => {},
}))
