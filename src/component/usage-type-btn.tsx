import { useParaphrasingStore } from "@/store/paraphrasingStore"
import { UsageType } from "@/type/UsageType"
import { Tab, Tabs } from "@nextui-org/react"
import { useSession } from "next-auth/react"

const UsageTypeButton = () => {
    const { data: session } = useSession()
    const { usageType, setUsageType } = useParaphrasingStore()

    const handleTabChange = (tabKey: UsageType) => {
        setUsageType(tabKey)
    }

    return (
        <Tabs
            disabledKeys={[!session ? UsageType.Premium : ""]}
            onChange={handleTabChange as any}
            color={usageType === UsageType.Premium ? "danger" : "primary"}
            selectedKey={usageType}
            onSelectionChange={handleTabChange as any}
            className={`font-semibold`}
        >
            {Object.values(UsageType).map((usageType) => {
                return <Tab key={usageType} title={usageType} />
            })}
        </Tabs>
    )
}

export default UsageTypeButton
