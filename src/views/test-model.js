import React, { Component } from 'react';
import ReactDom from 'react-dom';

import './test-model.css';

import Editor from '../components/editor/monaco-editor';
import { evaluateUserTemplate } from '../services/template-service';
import { RENDER_PLACEHOLDER_ID } from '../constants';

class App extends Component {
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
                list: {
                    cards: [{ name: 'name 1' }, { name: 'name 2' }, { name: 'name 3' }],
                },
            }),
        });
    };

    render() {
        const { tab, previewResult } = this.state;

        return (
            <div>
                <h1>Hmmm</h1>
                <div className={['app-editor', tab === 'editor' ? '' : 'hidden'].join(' ')}>
                    <Editor ref={this.bindEditorRef} />
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

ReactDom.render(<App />, document.getElementById(RENDER_PLACEHOLDER_ID));
