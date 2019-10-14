import { TRELLO_APP_KEY } from '../constants';
import { logger } from '../infra';

const BASE_API = 'https://api.trello.com/1';

const withToken = (trello, action) => action(trello);

const errorResponse = (message, error) => {
    logger.error(message, error);
    return {
        error: message,
        data: {},
    };
};

const getTokenPromise = trello =>
    trello
        .getRestApi()
        .isAuthorized()
        .then(isAuthorized =>
            isAuthorized ? Promise.resolve() : trello.getRestApi().authorize({ scope: 'read' }),
        )
        .then(() => trello.getRestApi().getToken())
        .then(token => ({
            token,
            apiOrigin: trello.getRestApi().apiOrigin,
        }));

const fetchData = (trello, { path, queryParams = {} }) =>
    getTokenPromise(trello)
        .then(({ token }) =>
            fetch(
                `${BASE_API}/${path}?key=${TRELLO_APP_KEY}&token=${token}&${new URLSearchParams(
                    queryParams,
                )}`,
            )
                .then(response => response.json())
                .then(data => ({
                    data,
                }))
                .catch(error => errorResponse(`API call to ${path} failed`, error)),
        )
        .catch(error => errorResponse(`Cannot retrieve API token`, error));

const cards = trello => ({
    listCards: listId => fetchData(trello, { path: `lists/${listId}/cards` }),
});

export const getTrelloApiService = trello => ({
    cards: withToken(trello, cards),
});
