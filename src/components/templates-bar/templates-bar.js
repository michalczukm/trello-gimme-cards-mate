import React from 'react';
import './templates-bar.css';

export const TemplatesBar = ({ templates, selectedTemplate, onSave, onSelect }) => {
    const selectChangeHandler = event => onSelect(event.target.value);
    const saveHandler = event => onSave(event);

    return (
        <div className="template-bar-container">
            <select
                value={selectedTemplate}
                onChange={selectChangeHandler}
                className="template-bar-container__item"
            >
                {templates.map(template => (
                    <option value={template.id} key={template.id}>
                        {template.type === 'system' && '🔧'} {template.name}
                    </option>
                ))}
            </select>

            <button onClick={onSave} className="template-bar-container__item">
                💾 Save template
            </button>
        </div>
    );
};
