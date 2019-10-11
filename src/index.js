const { Promise, initialize: initializeTrelloPowerUp } = window.TrelloPowerUp;

var WHITE_ICON =
    'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';

const boardButtonsHandler = trello => {
    return trello.popup({
        title: 'Option 1',
        items: [
            {
                text: 'Text inside: Option 1',
                callback: trello =>
                    trello.lists('id', 'name').then(lists => console.log('=== lists:', lists)),
            },
        ],
    });
};

initializeTrelloPowerUp({
    'board-buttons': function(t, options) {
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
