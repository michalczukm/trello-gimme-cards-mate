const { initialize: initializeTrelloPowerUp } = window.TrelloPowerUp;

const listActionHandler = trello =>
    trello.list('id', 'name').then(list =>
        trello.modal({
            url: './format-modal.html',
            title: `Gimme cards for "${list.name}" mate!`,
            fullscreen: true,
            args: {
                listId: list.id,
                listName: list.name
            },
        }),
    );

initializeTrelloPowerUp({
    'list-actions': () => [
        {
            text: 'Gimme cards for this list mate',
            condition: 'always',
            callback: listActionHandler,
        },
    ],
});

console.log('Loaded by: ' + document.referrer);
