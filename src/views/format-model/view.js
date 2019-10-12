import { TRELLO_APP_KEY, TRELLO_APP_NAME } from '../../constants';
import { getTrelloApiService } from '../../trello-api';

const trello = TrelloPowerUp.iframe({
    appKey: TRELLO_APP_KEY,
    appName: TRELLO_APP_NAME,
});

const listId = trello.arg('listId');

getTrelloApiService(trello)
    .cards.listCards(listId)
    .then(
        cards => (document.querySelector('#my_cards').innerHTML = JSON.stringify(cards, null, 2)),
    );
