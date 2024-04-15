import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel={"icon"} href={"/logo.png"} />
                <meta
                    name="description"
                    content="ParaFaze is a paraphrasing tool that can help you to paraphrase your text quickly and accurately."
                />
                <meta
                    name="keywords"
                    content="parafrase, paraphrase, paraphrasing, parafrase teks, ai tool, paraphrasing tool, paraphrase tool, paraphrase online, paraphrase website, paraphrase generator, paraphrase sentence, paraphrase text, paraphrase paragraph, paraphrase essay, paraphrase article, paraphrase content, paraphrase document, paraphrase document online, paraphrase document free, paraphrase document tool, paraphrase document generator, paraphrase document website, paraphrase document ai, paraphrase document software, paraphrase document app, paraphrase document website, paraphrase document tool online, paraphrase document generator online, paraphrase document website online, paraphrase document ai online, paraphrase document software online, paraphrase document app online"
                />
                <meta name="author" content="ParaFaze Team" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="google" content="notranslate" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-TileColor" content="#ffffff" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
