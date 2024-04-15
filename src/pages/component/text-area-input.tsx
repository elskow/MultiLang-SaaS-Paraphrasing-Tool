import { AppContext } from "@/AppContextProvider"
import handleFileUpload from "@/utils/fileUpload"
import { charCounts } from "@/utils/textCount"
import React, { useContext } from "react"

export function TextAreaInput({ inputLimit = 5000 }) {
    const { input, setInput, setOutput } = useContext(AppContext)

    React.useEffect(() => {
        const cachedInputText = localStorage.getItem("cachedInputText")
        if (cachedInputText) {
            setInput(cachedInputText)
        }
    }, [setInput])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value
        setOutput(" ")
        if (text.length > inputLimit) {
            text = text.slice(0, inputLimit)
        } else if (text.length === 0) {
            setOutput("")
        }
        setInput(text)
        localStorage.setItem("cachedInputText", text)
    }

    return (
        <div className="flex flex-col p-5 space-y-4 bg-white rounded-lg shadow-md">
            <label
                htmlFor="input"
                className="text-gray-700 font-semibold select-none"
            >
                Input Text
            </label>
            <textarea
                title="Enter your text here"
                name="User Input"
                rows={15}
                className="p-4 outline-none w-full bg-gray-50 rounded shadow-inner transition duration-200 focus:bg-slate-50 focus:bg-opacity-80"
                onChange={handleChange}
                draggable={false}
                style={{ resize: "none" }}
                placeholder="Enter your text here..."
                value={input}
            />
            <div className="flex justify-between items-center">
                <div>
                    <input
                        type="file"
                        accept=".txt"
                        className="hidden"
                        id="fileUpload"
                        onChange={(e) => handleFileUpload(e, setInput)}
                    />
                    <label
                        htmlFor="fileUpload"
                        className="bg-slate-700 text-white py-2 px-2 md:px-6 rounded cursor-pointer hover:bg-slate-600 transition duration-200 md:text-sm text-xs select-none font-medium"
                    >
                        Select File (.txt)
                    </label>
                </div>
                <p className="text-gray-700 md:text-sm text-xs">
                    Characters : {charCounts(input)}/{inputLimit}
                </p>
            </div>
        </div>
    )
}
