import { errorResponse } from '../../utils/errors';
import { SYSTEM_TEMPLATES } from './system-templates';

const TRELLO_DATA_KEY_TEMPLATES = 'gimme-cards-mate-templates';
const TRELLO_DATA_KEY_CURRENT_TEMPLATE = 'gimme-cards-mate-current-template';

const toKebabCase = str =>
    str &&
    str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');

export const getTemplatesService = trello => ({
    getAll: () =>
        Promise.all([
            trello.get('board', 'shared', TRELLO_DATA_KEY_TEMPLATES),
            trello.get('board', 'shared', TRELLO_DATA_KEY_CURRENT_TEMPLATE, 'breakfast-news'),
        ])
            .then(([savedTemplates, currentTemplateId]) => {
                const templates = [
                    ...(savedTemplates ? JSON.parse(savedTemplates || '{}') || [] : []),
                    ...SYSTEM_TEMPLATES,
                ];
                const current = templates.find(template => template.id === currentTemplateId);

                return {
                    data: {
                        templates,
                        current,
                    },
                };
            })
            .catch(error =>
                errorResponse(
                    `Cannot retrieve data at key="${TRELLO_DATA_KEY_TEMPLATES}" from Trello`,
                    error,
                ),
            ),
    setUserCustom: template => {
        const name = 'user custom';
        const newTemplate = {
            ...template,
            id: toKebabCase(name),
            name,
        };

        return trello
            .set('board', 'shared', TRELLO_DATA_KEY_TEMPLATES, JSON.stringify([newTemplate]))
            .then(() => ({ data: newTemplate }))
            .catch(error => errorResponse(`Cannot save ${name} template`, error));
    },
    setCurrent: template =>
        trello.set('board', 'shared', TRELLO_DATA_KEY_CURRENT_TEMPLATE, template.id),
});
