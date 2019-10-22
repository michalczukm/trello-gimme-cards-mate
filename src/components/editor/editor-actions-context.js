import React, { createContext, useContext } from 'react';

const EditorActionsContext = createContext({
    getCode: () => '',
    getResult: () => '',
    setActions: () => {},
});

export const EditorActionsProvider = EditorActionsContext.Provider;
export const EditorActionsConsumer = EditorActionsContext.Consumer;

export const useEditorActionsContext = () => useContext(EditorActionsContext);
