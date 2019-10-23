import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './format-modal.css';

const { iframe: trelloIFrame } = window.TrelloPowerUp;

import { TRELLO_APP_KEY, TRELLO_APP_NAME, RENDER_PLACEHOLDER_ID } from '../constants';
import { getTrelloApiService } from '../services/trello-api';
import { copyToClipboard } from '../utils';
import { Editor, EditorActionsProvider, useEditorActionsContext } from '../components/editor';
import { Loader } from '../components/loader';
import { TemplatesBar } from '../components/templates-bar';
import { getTemplatesService } from '../services/templates-service';

const trello = trelloIFrame({
    appKey: TRELLO_APP_KEY,
    appName: TRELLO_APP_NAME,
});

const listId = trello.arg('listId');

const templateService = getTemplatesService(trello);

const FormatModal = () => {
    const [listCardsResponse, setListCardsResponse] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    const editorActionsContext = useEditorActionsContext();

    useEffect(() => {
        getTrelloApiService(trello)
            .cards.listCards(listId)
            .then(response => setListCardsResponse(response));

        templateService.getAll().then(({ data }) => {
            setTemplates(data.templates);
            setCurrentTemplate(data.current);
        });
    }, []);

    const prepareList = () => ({
        cards: listCardsResponse.data,
    });

    const closeModalHandler = () => trello.closeModal();
    const copyResultToClipboardHandler = () => {
        copyToClipboard(editorActionsContext.getResult(prepareList()));
    };

    const saveTemplate = () => {
        templateService
            .setUserCustom({ value: editorActionsContext.getCode() })
            .then(({ data }) => setCurrentTemplate(data));
    };

    const saveTemplateHandler = event => {
        const userCustomTemplateExists = templates.some(template => template.type !== 'system');
        trello.popup({
            mouseEvent: event,
            type: 'confirm',
            title: 'Custom template',
            message: userCustomTemplateExists
                ? 'You already have custom template, do you want to update it?'
                : 'Save code as custom template?',
            confirmText: userCustomTemplateExists ? 'Update' : 'Save',
            cancelText: 'Cancel',
            confirmStyle: 'primary',
            onConfirm: saveTemplate,
        });
    };

    const selectTemplateHandler = template =>
        setCurrentTemplate(template) || templateService.setCurrent(template);

    const content = () =>
        listCardsResponse.error ? (
            <p>️⚠️ Ups, we cannot fetch your data 😢</p>
        ) : (
            <>
                <div className="format-modal__templates">
                    <TemplatesBar
                        templates={templates}
                        selectedTemplate={currentTemplate}
                        onSave={saveTemplateHandler}
                        onSelect={selectTemplateHandler}
                    />
                </div>
                <div className="format-modal__editor">
                    <Editor list={prepareList()} code={currentTemplate && currentTemplate.value} />
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

    return <div className="format-modal">{!listCardsResponse ? <Loader /> : content()}</div>;
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
