import React, { useEffect, forwardRef, useImperativeHandle, memo, useState } from 'react';
import * as monaco from 'monaco-editor';

const INITIAL_EDITOR_VALUE = `
/**
  Write here render function for your data,
  The current list is available under \`LIST\` const.
  The render methods are under \`render\` const.
  
  @example
  
  \`\`\`js
    render.writeLine('Hi! Checkout this list: "$\{LIST.name\}"');
    render.newLine();
    render.list(LIST.cards.map(card => card.name));
  \`\`\`
  
  Should result in:
  
  \`\`\`
    Hi! Checkout this list: "My fancy list"
    
    * card 1
    * card 2
    * card 3
  \`\`\`
 */

render.writeLine('Hi! Just start typing 😊');
render.list(LIST.cards.map(card => JSON.stringify(card, null, 2)));

`;

monaco.languages.typescript.javascriptDefaults.addExtraLib(`
type List = {
    name: string,
    cards: {
        id: string,
        name: string,
        desc: string,
        url: string,
        shortUrl: string,
        attachments: { id: string, name: string, url: string, date: string }[],
        labels: { id: string, name: string, color: string }[]
    }[]
};

declare const LIST: List;

declare const render: {
  write(content: string): void,
  newLine(): void;
  writeLine(content: string): void,
  list(items: string[], type: 'ordered' | 'unordered' = 'unordered'): void
}
`);

const editorId = 'embedded_monaco_editor_id';

const EditorPlaceholder = memo(() => (
    <div
        style={{
            height: '100%',
            widows: '100%',
        }}
        id={editorId}
    />
));

const MonacoEditor = (_, ref) => {
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        setEditor(
            monaco.editor.create(document.querySelector(`#${editorId}`), {
                language: 'javascript',
                value: INITIAL_EDITOR_VALUE,
                minimap: {
                    enabled: false,
                },
            }),
        );
    }, []);

    useImperativeHandle(ref, () => ({
        getCode: () => editor && editor.getValue(),
        setCode: code => editor && editor.setValue(code)
    }));

    return <EditorPlaceholder />;
};

export default memo(forwardRef(MonacoEditor));
