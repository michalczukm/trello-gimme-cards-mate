import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './format-modal.css';

const { iframe: trelloIFrame } = window.TrelloPowerUp;

import { TRELLO_APP_KEY, TRELLO_APP_NAME, RENDER_PLACEHOLDER_ID } from '../constants';
import { getTrelloApiService } from '../services/trello-api';
import { Editor } from '../components/editor';

const trello = trelloIFrame({
    appKey: TRELLO_APP_KEY,
    appName: TRELLO_APP_NAME,
});

const listId = trello.arg('listId');

const Root = () => {
    const [listCardsResponse, setListCardsResponse] = useState(null);
    const [editorRef, setEditorRef] = useState(null);

    useEffect(() => {
        getTrelloApiService(trello)
            .cards.listCards(listId)
            .then(response => setListCardsResponse(response));
    }, []);

    const bindEditorRef = ref => setEditorRef(ref);

    const closeModalHandler = () => trello.closeModal();
    const copyResultToClipboardHandler = () => navigator.clipboard.writeText();

    const content = () =>
        listCardsResponse.error ? (
            <p>️⚠️ Ups, we cannot fetch your data 😢</p>
        ) : (
            <>
                <div className="format-modal__editor">
                    <Editor
                        ref={bindEditorRef}
                        list={{
                            cards: listCardsResponse.data,
                        }}
                    />
                </div>
                <div className="format-modal__actions">
                    <button onClick={closeModalHandler} className="mod-danger">
                        Close modal
                    </button>
                    <button className="mod-primary">Copy result to clipboard</button>
                </div>
            </>
        );

    return <div className="format-modal">{!listCardsResponse ? <p>Loading...</p> : content()}</div>;
};

ReactDOM.render(<Root />, document.getElementById(RENDER_PLACEHOLDER_ID));
