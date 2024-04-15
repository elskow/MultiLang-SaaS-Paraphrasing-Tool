import Head from "next/head"
import { useContext } from "react"
import { SlPencil } from "react-icons/sl"

import LanguageDropdown from "@/pages/component/lang-dropdown"
import Navbar from "@/pages/component/navbar"
import { TextAreaInput } from "@/pages/component/text-area-input"
import { TextAreaOutput } from "@/pages/component/text-area-output"
import UsageTypeButton from "@/pages/component/usage-type-btn"

import { AppContext } from "@/AppContextProvider"
import Footer from "@/pages/component/footer"
import { postParaphraseText } from "@/services/paraphrase"
import { CgSpinner } from "react-icons/cg"

const Metadata = () => (
    <Head>
        <title>ParaFaze - Fast and Accurate Paraphrasing Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
)

export default function Home() {
    const { usageType, setOutput, isLoading, setIsLoading, input, language } =
        useContext(AppContext)

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
            <main className="bg-sky-200 flex flex-col items-center min-h-screen bg-opacity-10">
                <Navbar />
                <div className={`w-full lg:max-w-6xl pt-16 px-4 md:px-8`}>
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
                    <div className="flex flex-col gap-5 w-full">
                        <button
                            type="submit"
                            className={`bg-green-600 flex justify-center items-center text-white py-3 rounded-lg gap-2 w-fit mx-auto px-4 ${
                                isLoading
                                    ? "bg-opacity-50 cursor-wait"
                                    : "hover:bg-green-800"
                            } transition-all duration-300 ease-in-out font-semibold tracking-tight shadow-md`}
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {!isLoading ? (
                                <SlPencil className="text-lg" />
                            ) : (
                                <CgSpinner className="animate-spin" />
                            )}{" "}
                            Paraphrase Text
                        </button>
                        <div className={`md:hidden pb-6`}>
                            <TextAreaOutput />
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}
