import React from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';
export const Toggle = () => {
    return (
        <Center>
            <input
                id='MaterialToggleRed'
                name='MaterialToggleRed'
                type='checkbox'
            />
            <label htmlFor='MaterialToggleRed' className='label-red'></label>
        </Center>
    );
};

const ToggleLabel = styled.label``;
const Center = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    position: relative;
    margin: 0 ${rems[16]};
    width: ${rems[24]};
    input[type='checkbox'] {
        display: none;

        &:checked + label::before {
            background: lime;
            opacity: 0.5;
        }
        &:checked + label::after {
            background: tomato;
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
