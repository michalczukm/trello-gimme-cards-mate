import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './format-modal.css';

const { iframe: trelloIFrame } = window.TrelloPowerUp;

import { TRELLO_APP_KEY, TRELLO_APP_NAME, RENDER_PLACEHOLDER_ID } from '../constants';
import { getTrelloApiService } from '../services/trello-api';
import { Editor, EditorActionsProvider, useEditorActionsContext } from '../components/editor';
import { copyToClipboard } from '../utils';

const trello = trelloIFrame({
    appKey: TRELLO_APP_KEY,
    appName: TRELLO_APP_NAME,
});

const listId = trello.arg('listId');

const FormatModal = () => {
    const [listCardsResponse, setListCardsResponse] = useState(null);
    const editorActionsContext = useEditorActionsContext();

    useEffect(() => {
        getTrelloApiService(trello)
            .cards.listCards(listId)
            .then(response => setListCardsResponse(response));
    }, []);

    const prepareList = () => ({
        cards: listCardsResponse.data,
    });

    const closeModalHandler = () => trello.closeModal();
    const copyResultToClipboardHandler = () => {
        copyToClipboard(editorActionsContext.getResult(prepareList()));
    };

    const content = () =>
        listCardsResponse.error ? (
            <p>️⚠️ Ups, we cannot fetch your data 😢</p>
        ) : (
            <>
                <div className="format-modal__editor">
                    <Editor list={prepareList()} />
                </div>
                <div className="format-modal__actions">
                    <button onClick={closeModalHandler} className="mod-danger">
                        Close modal
                    </button>
                    <button onClick={copyResultToClipboardHandler} className="mod-primary">
                        Copy result to clipboard
                    </button>
                </div>
            </>
        );

    return <div className="format-modal">{!listCardsResponse ? <p>Loading...</p> : content()}</div>;
};

const Root = () => {
    const [getActions, setActions] = useState({});

    return (
        <EditorActionsProvider
            value={{
                getCode: getActions.getCode,
                getResult: getActions.getResult,
                setActions,
            }}
        >
            <FormatModal />
        </EditorActionsProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById(RENDER_PLACEHOLDER_ID));
