import React, { Component } from 'react';
import ReactDom from 'react-dom';

import './view.css';

import Editor from '../../components/editor';

class App extends Component {
    editorRef = null;

    state = {
        tab: 'editor',
        emittedCode: '',
    };

    bindEditorRef = ref => (this.editorRef = ref);

    selectEditorHandler = () => this.setState({ tab: 'editor' });
    selectPreviewHandler = () => {
        this.setState({
            tab: 'preview',
            emittedCode: this.editorRef.getCode(),
        });
    };

    render() {
        const { tab, emittedCode } = this.state;

        return (
            <div>
                <div className={['app-editor', tab === 'editor' ? '' : 'hidden'].join(' ')}>
                    <Editor ref={this.bindEditorRef} />
                </div>
                <div className={['app-editor', tab === 'preview' ? '' : 'hidden'].join(' ')}>
                    <pre>
                        <code>{emittedCode}</code>
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

ReactDom.render(<App />, document.querySelector('#react-app'));
