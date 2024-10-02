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
                    return <Image className="min-w-80 w-1/3" src={src || ""} width={1000} height={1000} alt="Texto I" {...rest} />
                }
            }
        }>{content}</Markdown>
    )
}