import React from 'react';
import styled from 'styled-components';

export default function TabsButton({
    children
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <button className='TabsButton icon_button cta' type='submit'>
            {children}
        </button>
    );
}
