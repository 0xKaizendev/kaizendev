"use client"
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { highlightAll } from "prismjs";


import { FC, Fragment, useCallback, useEffect } from "react";

export type CodeGroupProps = {
    code: string | string[];
    language:
    | "js"
    | "css"
    | "json"
    | "jsx"
    | "typescript"
    | "tsx"
    | "yml"
    | "Rust"
    | "bash"
    | "html"
    | "javascript";
    className?: string;
    lineHighlight?: string;
    plugins?: ("line-numbers" | "highlight-keywords")[];
};

export const Code: FC<CodeGroupProps> = ({ language, plugins, lineHighlight, code, className }) => {
    const router = useRouter()
    const { theme } = useTheme()
    const loadDependencies = useCallback(async () => {
        if (language === "tsx") {
            // @ts-ignore
            await import(`prismjs/components/prism-jsx`);
            // @ts-ignore
            await import(`prismjs/components/prism-typescript`);
        }
        if (language === "html") {
            // @ts-ignore
            await import(`prismjs/components/prism-markup`);
        }
        if (language !== "html") {
            await import(`prismjs/components/prism-${language}`);
        }
        if (plugins?.includes("line-numbers")) {
            // @ts-ignore
            await import("prismjs/plugins/line-numbers/prism-line-numbers.js");
        }
        if (plugins?.includes("highlight-keywords")) {
            // @ts-ignore
            await import("prismjs/plugins/highlight-keywords/prism-highlight-keywords.js");
        }

        if (lineHighlight) {
            // @ts-ignore
            await import("prismjs/plugins/line-highlight/prism-line-highlight.js");
        }

        highlightAll();
    }, [language, lineHighlight, plugins]);

    useEffect(() => {
        loadDependencies();
    }, [language, loadDependencies]);


    // useEffect(() => {
    //     router.refresh()
    //     console.log(theme)
    //     const loadTheme = async () => {
    //         if (theme === "dark") {
    //             await import("prismjs/themes/prism-okaidia.css");
    //         } else {
    //             await import("prismjs/themes/prism.css");
    //         }
    //         highlightAll();
    //     };

    //     loadTheme();
    // }, [theme]);
    return (
        <pre
            // className={clsx(
            //     plugins,
            //     lineHighlight && "line-highlight",
            //     `language-${language}`,
            //     className
            // )}
            data-line={lineHighlight}
            tabIndex={-1}
        >
            {(Array.isArray(code) ? code : [code]).map((code, index) => {
                return (
                    <Fragment key={index}>
                        <code className={`language-${language} text-xs`} data-selected-index={index}>
                            {code}
                        </code>
                    </Fragment>
                );
            })}
        </pre>
    );
};
