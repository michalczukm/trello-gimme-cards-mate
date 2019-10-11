const { Promise, initialize: initializeTrelloPowerUp } = window.TrelloPowerUp;

var WHITE_ICON =
    'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';

const boardButtonsHandler = trello => {
    return trello.lists('id', 'name').then(lists => {
        return trello.popup({
            title: 'Pick list to get content from:',
            items: lists.map(list => ({
                text: list.name,
                callback: trello =>
                    trello.modal({
                        url: './views/format-model/view.html',
                        title: `Gimme cards mate for "${list.name}" board`,
                        fullscreen: false,
                    }),
            })),
        });
    });
};

initializeTrelloPowerUp({
    'board-buttons': () => {
        return [
            {
                icon: WHITE_ICON,
                text: 'Gimme cards mate',
                condition: 'always',
                callback: boardButtonsHandler,
            },
        ];
    },
});
