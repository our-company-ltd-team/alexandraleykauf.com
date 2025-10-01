import React from 'react';

export type TextBlockProps = {
    text: React.ReactNode;
};

const TextBlock: React.FC<TextBlockProps> = ({ text }) => {
    return <p>{text}</p>;
};

export default TextBlock;
