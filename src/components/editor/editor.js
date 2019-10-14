import React, { Component } from 'react';

import './editor.css';

import { evaluateUserTemplate } from '../../services/template-service';
import MonacoEditor from './monaco-editor';

export class Editor extends Component {
    editorRef = null;

    state = {
        tab: 'editor',
        previewResult: '',
    };

    bindEditorRef = ref => (this.editorRef = ref);

    selectEditorHandler = () => this.setState({ tab: 'editor' });
    selectPreviewHandler = () => {
        this.setState({
            tab: 'preview',
            previewResult: evaluateUserTemplate(this.editorRef.getCode(), {
                list: this.props.list,
            }),
        });
    };

    render() {
        const { tab, previewResult } = this.state;

        return (
            <>
                <button
                    className={tab === 'editor' ? 'tab tab--active' : ''}
                    onClick={this.selectEditorHandler}
                >
                    ⚛️ Editor
                </button>
                <button
                    className={tab === 'preview' ? 'tab tab--active' : ''}
                    onClick={this.selectPreviewHandler}
                >
                    🗂 Preview
                </button>

                <div className="editor-content-wrapper">
                    <div
                        className={[
                            tab === 'editor' ? '' : 'hidden',
                            'editor-content-wrapper__editor',
                        ].join(' ')}
                    >
                        <MonacoEditor ref={this.bindEditorRef} />
                    </div>
                    <div className={tab === 'preview' ? '' : 'hidden'}>
                        <pre class="preview-result">{previewResult}</pre>
                    </div>
                </div>
            </>
        );
    }
}
