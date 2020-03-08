import React from 'react';

export default function TabsButton({
    children
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <button data-todo-button type='submit'>
            {children}
        </button>
    );
}
