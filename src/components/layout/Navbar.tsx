import React from 'react';
import styled from 'styled-components';

export const Navbar = () => {
    return (
        <Header>
            <Nav>
                <div>
                    <img src='' alt='logo' />
                </div>
                <SearchBar>
                    <input type='text' placeholder='search' />
                </SearchBar>
                <div>
                    <UlSettings>
                        <li>
                            <Add>+</Add>
                        </li>
                        <li>
                            <DarkmodeButton>darkmode</DarkmodeButton>
                        </li>
                    </UlSettings>
                </div>
            </Nav>
        </Header>
    );
};

const Header = styled.header`
    border-bottom: solid 1px #ca2100;
    background: #cacaca;
    transition: height 200ms ease-in;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    height: 44px;
    z-index: 400;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
`;

const Nav = styled.nav`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    max-width: 922px;
    margin: auto;
    height: 44px;
`;

const UlSettings = styled.ul`
    display: flex;
    position: relative;
    list-style: none;
    justify-content: flex-end;
    li {
        list-style-type: none;
        cursor: pointer;
        width: 30px;
        height: 30px;
        text-align: center;
    }
`;
const Add = styled.button`
    margin-right: 15px;
    font-size: 30px;
`;
const DarkmodeButton = styled.button``;

const SearchBar = styled.div`
    width: 100%;
    input {
        width: 100%;
    }
`;
