import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { TRELLO_APP_KEY, TRELLO_APP_NAME, RENDER_PLACEHOLDER_ID } from '../constants';
import { getTrelloApiService } from '../services/trello-api';
import { Editor } from '../components/editor';

const trello = TrelloPowerUp.iframe({
    appKey: TRELLO_APP_KEY,
    appName: TRELLO_APP_NAME,
});

const listId = trello.arg('listId');

const Root = () => {
    const [listCardsResponse, setListCardsResponse] = useState(null);

    useEffect(() => {
        getTrelloApiService(trello)
            .cards.listCards(listId)
            .then(response => setListCardsResponse(response));
    }, []);

    const content = () =>
        listCardsResponse.error ? (
            <p>️⚠️ Ups, we cannot fetch your data 😢</p>
        ) : (
            <Editor
                list={{
                    cards: listCardsResponse.data,
                }}
            />
        );

    return <div>{!listCardsResponse ? <p>Loading...</p> : content()}</div>;
};

ReactDOM.render(<Root />, document.getElementById(RENDER_PLACEHOLDER_ID));
