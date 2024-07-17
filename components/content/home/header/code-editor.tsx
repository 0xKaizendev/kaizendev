import { Code, CodeGroupProps } from "@/components/code";
import { CopyButton } from "@/components/copy-button";

export const CodeEditor = ({
    code,
    language,
}: {
    code: string
    language: CodeGroupProps["language"];
}) => {
    return (
        <figure className="relative  justify-self-end flex-col overflow-hidden rounded-md border-2 border-gray-200/40 bg-gray-900 p-2.5 shadow-2xl drop-shadow-lg dark:border-gray-600/40 w-full">
            <header
                className="mb-2 grid items-center border-b border-b-gray-800 pb-2"
                style={{ gridTemplateColumns: "50px 1fr 50px" }}
            >
                <i className="flex gap-1.5">
                    <button
                        tabIndex={-1}
                        aria-hidden
                        className="h-3 w-3 rounded-full transition-colors bg-[#EC6A5F]"
                    />
                    <button
                        tabIndex={-1}
                        aria-hidden
                        className="h-3 w-3 rounded-full transition-colors bg-sky-500"
                    />
                    <button
                        tabIndex={-1}
                        aria-hidden
                        className="h-3 w-3 rounded-full transition-colors bg-[#61C454]"
                    />
                </i>
                <div className="color select-none text-center text-[13px] leading-none tracking-wide text-gray-500">
                    /index.tsx
                </div>
                <div className="flex justify-end">
                    <CopyButton
                        content={Array.isArray(code) ? code.join("\n") : code}
                        className="text-gray-500 hf:text-white"
                    />
                </div>
            </header>
            <main className="relative overflow-hidden before:absolute w-full">
                {/* <div className="sm:scrollbar-none relative h-full overflow-auto "> */}
                    <Code className="text-[13px]" code={code} language={language} plugins={["highlight-keywords"]} />
                {/* </div> */}
            </main>
        </figure>
    );
};