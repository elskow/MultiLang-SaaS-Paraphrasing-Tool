import { Button } from "@nextui-org/react"
import Head from "next/head"
import { SlPencil } from "react-icons/sl"

import LanguageDropdown from "@/component/lang-dropdown"
import Navbar from "@/component/navbar"
import { TextAreaInput } from "@/component/text-area-input"
import { TextAreaOutput } from "@/component/text-area-output"
import UsageTypeButton from "@/component/usage-type-btn"

import Footer from "@/component/footer"
import { postParaphraseText } from "@/services/paraphrase"
import { useParaphrasingStore } from "@/store/paraphrasingStore"

const Metadata = () => (
    <Head>
        <title>ParaFaze - Fast and Accurate Paraphrasing Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
)

export default function Home() {
    const { usageType, setOutput, isLoading, setIsLoading, input, language } =
        useParaphrasingStore()

    const handleSubmit = async () => {
        setIsLoading(true)
        setOutput(" ")

        try {
            const paraphrasedText = await postParaphraseText(input, language)
            setOutput(paraphrasedText)
        } catch (error) {
            console.error(error)
            setOutput("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Metadata />
            <main className="bg-slate-100 min-h-screen flex flex-col items-center justify-center pb-6 space-y-10">
                <Navbar />
                <div className="lg:rounded-3xl bg-white shadow-sm max-w-[1024px] w-full px-8 py-8">
                    <div className="flex flex-wrap md:text-base text-sm justify-between w-full">
                        <div className="flex gap-2 md:gap-4">
                            <UsageTypeButton />
                        </div>
                        <LanguageDropdown />
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-2 md:space-y-0 space-x-0 space-y-4 rounded-lg w-full pt-6 gap-4 pb-6">
                        <TextAreaInput
                            inputLimit={usageType === "Standard" ? 500 : 1000}
                        />
                        <div className={`md:grid hidden`}>
                            <TextAreaOutput />
                        </div>
                    </div>
                    <div className="space-y-10 flex flex-col items-center mb-6 select-none">
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="inline-flex items-center justify-center rounded-xl text-xs md:text-sm font-medium transition-all active:scale-95 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 py-6 bg-sky-100 px-6 md:px-8 hover:bg-sky-200 transform duration-500 ease-in-out active:bg-sky-300"
                        >
                            {!isLoading && (
                                <>
                                    <SlPencil className="text-lg" /> Paraphrase
                                    Text
                                </>
                            )}
                        </Button>
                        <div className={`md:hidden pb-6 w-full`}>
                            <TextAreaOutput />
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}
