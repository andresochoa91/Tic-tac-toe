import React from 'react';

const TictactoeContext = React.createContext();

export const Provider = TictactoeContext.Provider;
export const Consumer = TictactoeContext.Consumer;