const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInput: (input: string) => void,
) => {
    const file = e.target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => setInput(e.target?.result as string)
        reader.readAsText(file)
    }
}

export default handleFileUpload
