import React, { useEffect, useMemo, useState } from "react";
import { marked } from "marked";

type Props = {
    md: string;
};

const MdRender: React.FC<Props> = ({ md }) => {
    const [htmlContent, setHtmlContent] = useState<string>("");

    useEffect(() => {
        // Asynchronously render the markdown content
        const renderMarkdown = async () => {
            const content = await marked(md);
            setHtmlContent(content);
        };

        renderMarkdown();
    }, [md]);

    return (
        <div className="prose prose-p:w-full w-full prose-thead:text-left prose-a:text-primary text-sm">
            <div
                className="text-justify"
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                }}
                dangerouslySetInnerHTML={{
                    __html: htmlContent,
                }}
            />
        </div>

    );
};
export default MdRender;