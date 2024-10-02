import Markdown from "react-markdown";

export function QuestionMarkdown({ content } : { content: string }) {
    return (
        <Markdown components={
            {
                h4(props) {
                    const {node, ...rest} = props;
                    return <h4 className="text-xs p-2" {...rest} />
                } 
            }
        }>{content}</Markdown>
    )
}