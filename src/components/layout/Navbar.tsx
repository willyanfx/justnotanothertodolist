import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { logout } from '../../helpers';
import { useAppState } from '../../app-state';
import {
    DialogStateContext,
    DialogSetContext
} from '../../context/DialogContext';
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

const Logo = () => (
    <div>
        <img src='' alt='logo' />
    </div>
);
function Account() {
    const [{ user }] = useAppState();
    const showModal = useContext(DialogStateContext);
    const setShowModal = useContext(DialogSetContext);
    return user ? (
        <AccountDiv>
            <QuickAddButton onClick={() => setShowModal(!showModal)}>
                +
            </QuickAddButton>

            <DarkMode></DarkMode>
            <div data-avatar></div>
        </AccountDiv>
    ) : (
        <div>Loading user</div>
    );
}

{
    /* <button onClick={() => logout()}>Log out</button> */
}

const DarkMode = styled.div`
    height: 32px;
    width: 32px;
    background: teal;
`;

const QuickAddButton = styled.button`
    height: 32px;
    width: 32px;
    background: purple;
    border-radius: 50%;
`;

const AccountDiv = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 42px;
    [data-avatar] {
        position: relative;
        height: 32px;
        width: 32px;
        background: purple;
        border-radius: 50%;
    }
`;

const Header = styled.header`
    border-bottom: solid 1px #cacaca;
    transition: height 200ms ease-in;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    height: 42px;
    z-index: 400;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.11),
            rgba(255, 255, 255, 0.11)
        ),
        #121212;
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
