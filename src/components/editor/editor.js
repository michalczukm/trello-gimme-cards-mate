import React, { Component } from 'react';

// import './editor.css';

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
            <div>
                <div className={['app-editor', tab === 'editor' ? '' : 'hidden'].join(' ')}>
                    <MonacoEditor ref={this.bindEditorRef} />
                </div>
                <div className={['app-editor', tab === 'preview' ? '' : 'hidden'].join(' ')}>
                    <pre>
                        <code>{previewResult}</code>
                    </pre>
                </div>

                <button
                    className={tab === 'editor' ? 'tab__active' : ''}
                    onClick={this.selectEditorHandler}
                >
                    🗂 Switch tab: Editor
                </button>
                <button
                    className={tab === 'preview' ? 'tab__active' : ''}
                    onClick={this.selectPreviewHandler}
                >
                    🗂 Switch tab: Preview
                </button>
            </div>
        );
    }
}
