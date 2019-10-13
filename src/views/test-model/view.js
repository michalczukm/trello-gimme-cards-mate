import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactDom from 'react-dom';

import './view.css';

import Editor from '../../components/editor';

const App = () => {
    let editorRef = null;

    const [tab, setTab] = useState('editor');
    const [emittedCode, setEmittedCode] = useState('');

    const bindEditorRef = ref => (editorRef = ref);

    const switchTabHandler = tab => setTab(tab);
    const clickHandler = () => setEmittedCode(editorRef.getCode());

    return (
        <div>
            <div className={tab === 'editor' ? '' : 'hidden'}>
                <div className="app-editor">
                    <Editor ref={bindEditorRef} />
                </div>
                <button onClick={clickHandler}>Click me!</button>
            </div>
            <div className={['app-editor', tab === 'preview' ? '' : 'hidden'].join(' ')}>
                <pre>
                    <code>{emittedCode}</code>
                </pre>
            </div>

            <button
                className={tab === 'editor' ? 'tab__active' : ''}
                onClick={switchTabHandler.bind(this, 'editor')}
            >
                🗂 Switch tab: Editor
            </button>
            <button
                className={tab === 'preview' ? 'tab__active' : ''}
                onClick={switchTabHandler.bind(this, 'preview')}
            >
                🗂 Switch tab: Preview
            </button>
        </div>
    );
};

ReactDom.render(<App />, document.querySelector('#react-app'));
