import React, { Component } from 'react';

import './editor.css';

import { evaluateUserTemplate } from '../../services/render-template-service';
import MonacoEditor from './monaco-editor';
import { EditorActionsConsumer } from './editor-actions-context';

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

    editorActions = {
        getCode: () => this.editorRef.getCode(),
        getResult: list =>
            evaluateUserTemplate(this.editorRef.getCode(), {
                list,
            }),
    };

    render() {
        const { tab, previewResult } = this.state;

        return (
            <EditorActionsConsumer>
                {editorActions =>
                    editorActions.setActions(this.editorActions) || (
                        <div className="editor-container">
                            <div>
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
                            </div>

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
                                    <pre className="preview-result">{previewResult}</pre>
                                </div>
                            </div>
                        </div>
                    )
                }
            </EditorActionsConsumer>
        );
    }
}
