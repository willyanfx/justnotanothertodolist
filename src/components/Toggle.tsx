import React, { useState } from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';

import { useThemeValue } from '../context/ThemeContext'

type ToggleProps = {
    onClick: ((event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void)
    defaultChecked: boolean;
}



export const Toggle: React.FC<ToggleProps> = () => {
    const { theme, setTheme } = useThemeValue();
    const [checked, setChecked] = useState(theme.mode === 'dark');

    function changeTheme() {
        setChecked(theme.mode === 'dark' ? true : false)
        theme.mode === 'dark'
            ? setTheme({ ...theme, mode: 'light' })
            : setTheme({ ...theme, mode: 'dark' })
    }

    return (
        <ToggleDiv>
            <input
                defaultChecked={checked}
                id='toggle'
                name='toggle'
                type='checkbox'
            />
            <label onClick={changeTheme} htmlFor='toggle' className='label-red'></label>
        </ToggleDiv>

    );
};


const ToggleDiv = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    position: relative;
    margin: 0 ${rems[16]};
    width: ${rems[24]};
    input[type='checkbox'] {
        display: none;

        &:checked + label::before {
            background: ${props => props.theme.primary};
            opacity: 0.5;
        }
        &:checked + label::after {
            background: ${props => props.theme.toggle};
            left: 20px;
        }
    }
    > label {
        cursor: pointer;
        height: 0px;
        position: relative;
        width: 40px;

        &:before {
            background: rgb(0, 0, 0);
            box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
            border-radius: 8px;
            content: '';
            height: 16px;
            margin-top: -8px;
            position: absolute;
            opacity: 0.3;
            transition: all 0.4s ease-in-out;
            width: 40px;
        }
        &:after {
            background: rgb(255, 255, 255);
            border-radius: 16px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
            content: '';
            height: 24px;
            left: -4px;
            margin-top: -8px;
            position: absolute;
            top: -4px;
            transition: all 0.3s ease-in-out;
            width: 24px;
        }
    }
`;
