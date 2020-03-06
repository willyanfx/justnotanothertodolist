import React, { createContext, useState, useContext } from 'react';

type SetStateContext = React.Dispatch<React.SetStateAction<boolean>> | any;

export const DialogStateContext = createContext<boolean>(false);
export const DialogSetContext = createContext<SetStateContext>(null);
export const DialogProvider: React.FC = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <DialogStateContext.Provider value={showModal}>
            <DialogSetContext.Provider value={setShowModal}>
                {children}
            </DialogSetContext.Provider>
        </DialogStateContext.Provider>
    );
};
