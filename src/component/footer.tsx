import Link from "next/link"

const Footer = () => {
    return (
        <div className="w-full mt-20 pb-2">
            <div className="py-5 max-w-[1024px] w-full mx-auto px-6 md:px-10">
                <p className="text-sm text-slate-700">
                    © {new Date().getFullYear()}
                    <span>
                        {" "}
                        <Link href={`https://github.com/alfazh123/ParaFaze`}>
                            ParaFaze. All rights reserved.
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Footer
