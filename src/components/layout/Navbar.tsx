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
import { Plus } from '../Icons';
export const Navbar = () => {
    return (
        <Header>
            <NavBar>
                <Logo />
                <Account />
            </NavBar>
        </Header>
    );
};

const Logo = () => <LogoSvg>L</LogoSvg>;
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
                        <p>{user.displayName}</p>
                        <li>
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
    width: ${rems[32]};
    height: ${rems[32]};
    background: tomato;
`;

const QuickAddButton = styled.button`
    height: 2rem;
    width: 2rem;
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
        min-width: 1.5rem;
        min-height: 1.5rem;
        color: #fff;
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
        margin: 0 1rem;
        img {
            border-radius: 50%;
            height: 2rem;
            width: 2rem;
        }
        > ul {
            color: #fff;
            position: absolute;
            margin: 4px 0;
            padding: 0.25rem 0;
            visibility: visible;
            background: linear-gradient(
                    0deg,
                    rgba(255, 255, 255, 0.12),
                    rgba(255, 255, 255, 0.12)
                ),
                #121212;
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2),
                0px 3px 14px rgba(0, 0, 0, 0.12),
                0px 8px 10px rgba(0, 0, 0, 0.14);
            border-radius: 0.25rem;
            border: none;
            outline: none;
            p {
                padding: 0 0.5rem;
                color: #BB86FC;
                font-weight: 600;
            }
            li {
                padding: 0 0.5rem;
                height: 2rem;
                display: flex;
                align-items: center;
                &:hover {
                    background: #484848;
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
