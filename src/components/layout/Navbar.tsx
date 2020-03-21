import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { logout } from '../../helpers';
import { useAppState } from '../../app-state';
import {
    DialogStateContext,
    DialogSetContext
} from '../../context/DialogContext';
import { Toggle } from '../Toggle';
import { rems } from '../../constants/tokens';
import { Plus } from '../Assets/Icons';
import { Logo } from '../Assets/logo';
export const Navbar = () => {
    return (
        <Header>
            <NavBar>
                <LogoSvg>
                    <Logo />
                    <span>
                        Boring TODO
                    </span>
                </LogoSvg>
                <Account />
            </NavBar>
        </Header>
    );
};

function Account() {
    const [{ user }] = useAppState();
    const showModal = useContext(DialogStateContext);
    const setShowModal = useContext(DialogSetContext);
    const [showMenu, setShowMenu] = useState(false);

    return user ? (
        <AccountDiv>
            <QuickAddButton onClick={() => setShowModal(!showModal)}>
                <Plus />
            </QuickAddButton>

            <Toggle defaultChecked={false} onClick={() => console.log('ehehe')} />

            <div data-avatar>
                <img
                    src={user.photoURL}
                    alt='Avatar'
                    onClick={() => setShowMenu(!showMenu)}
                />

                {showMenu && (
                    <ul>
                        <li>{user.displayName}</li>
                        <li onClick={() => setShowMenu(!showMenu)}>
                            <span role='button' onClick={() => logout()}>
                                Logout
                            </span>
                        </li>
                    </ul>
                )}
            </div>
        </AccountDiv>
    ) : (
            <div>Loading user</div>
        );
}

const LogoSvg = styled.div`
    display: flex;
    margin-left: ${rems[16]};
    align-items:center;
    > span {
        font-size:  ${rems[20]};
        font-weight: 600;
        color: #fff;
        margin-left: ${rems[16]};
    }
    svg {
        fill: #fff;
    }
`;

const QuickAddButton = styled.button`
    height: ${rems[32]};
    width: ${rems[32]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.primary};
    border: 1px solid transparent;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2), 
                0px 3px 14px rgba(0, 0, 0, 0.12), 
                0px 8px 10px rgba(0, 0, 0, 0.14);   
     svg {
        min-width: ${rems[24]};
        min-height: ${rems[24]};
        color: ${props => props.theme.primary};
    }
`;

const AccountDiv = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    [data-avatar] {
        position: relative;
        margin: 0 ${rems[16]};
        img {
            border-radius: 50%;
            height: ${rems[32]};
            width: ${rems[32]};
        }
        > ul {
            color:  ${props => props.theme.text};
            position: absolute;
            margin: ${rems[4]} 0;
            padding: ${rems[4]} 0;
            visibility: visible;
            background: ${props => props.theme.popup};
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2),
                0px 3px 14px rgba(0, 0, 0, 0.12),
                0px 8px 10px rgba(0, 0, 0, 0.14);
            border-radius: 0.25rem;
            border: none;
            outline: none;
            p {
                padding: 0 ${rems[8]};
                color: ${props => props.theme.text};
                font-weight: 600;
            }
            li {
                padding: 0 ${rems[8]};
                height: ${rems[32]};
                display: flex;
                align-items: center;
                cursor: pointer;
                &:hover {
                    background: ${props => props.theme.hover};
                }
            }
        }
    }
`;

const Header = styled.header`
    transition: height 200ms ease-in;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    height: 52px;
    z-index: 400;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;

    background: ${props => props.theme.header};
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),
        0px 6px 10px rgba(0, 0, 0, 0.14);
`;

const NavBar = styled.nav`
    position: relative;
    display: grid;
    max-width: 922px;
    width: 100%;
    max-height: 42px;
    margin: auto;
    justify-content: center;
    align-items: center;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr;
`;
