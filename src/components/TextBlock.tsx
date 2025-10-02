import React from 'react';

export type TextBlockProps = {
    text: React.ReactNode;
};

const TextBlock: React.FC<TextBlockProps> = (data) => {
    return <p>{data.text}</p>;
};

export default TextBlock;
