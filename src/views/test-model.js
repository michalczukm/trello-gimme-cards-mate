import React from 'react';
import ReactDOM from 'react-dom';

import { RENDER_PLACEHOLDER_ID } from '../constants';
import { Editor } from '../components/editor';

const Root = () => {
    return (
        <div style={{ width: '600px', height: '100px'}}>
            <Editor
                list={{
                    cards: [{ name: 'name 1' }, { name: 'name 2' }, { name: 'name 3' }],
                }}
            />
        </div>
    );
};

ReactDOM.render(<Root />, document.getElementById(RENDER_PLACEHOLDER_ID));
