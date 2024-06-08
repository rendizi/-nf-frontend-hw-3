import React, { createContext, ReactNode, useContext, useState } from 'react';

export type IdContextType = {
    id: number;
    setId: (id: number) => void;
};

const defaultValue: IdContextType = {
    id: -1,
    setId: () => {}
}

export const IdContext = createContext<IdContextType>(defaultValue);

export const BlogIdProvider = ({ children }: { children: ReactNode }) => {
    const [blogId, setBlogId] = useState(defaultValue.id);

    const setId = (id: number) => {
        setBlogId(id);
    }

    return (
        <IdContext.Provider value={{ id: blogId, setId }}>
            {children}
        </IdContext.Provider>
    );
};

export const useBlogId = () => {
    const context = useContext(IdContext);
    if (context === undefined) {
        throw new Error("Context is undefined ")
    }
    return context;
}
