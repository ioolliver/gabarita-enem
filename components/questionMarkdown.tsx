import Image from "next/image";
import Markdown from "react-markdown";

export function QuestionMarkdown({ content } : { content: string }) {
    return (
        <Markdown components={
            {
                h4(props) {
                    const {node, ...rest} = props;
                    return <h4 className="text-xs p-2" {...rest} />
                },
                img(props) {
                    const {node, width, height, src, className, ...rest} = props;
                    return <Image className="max-w-[40rem] w-full" src={src || ""} width={1000} height={1000} alt="Texto I" {...rest} />
                },
                code(props) {
                    const {className, children, ...rest} = props;
                    return <p className="w-full flex flex-col gap-2 text-justify">{children}</p>
                },
                pre(props) {
                    const {className, children, ...rest} = props;
                    return <div className="flex flex-col gap-2">{children}</div>
                }
            }
        }>{content}</Markdown>
    )
}