import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AddProject from '../AddProject';
import Projects from '../Projects';
import { StandardProj } from '../../types';
import { MdInbox, MdToday, MdDateRange } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { rems } from '../../constants/tokens';

export const Sidebar = () => {
    const [showProjects, setShowProjects] = useState<boolean>(true);

    return (
        <SidebarContainer>
            <ul>
                <li data-todo-sidebar-list>
                    <Link to={`/${StandardProj.inbox}`}>
                        <span>
                            <MdInbox />
                        </span>
                        <span>Inbox</span>
                    </Link>
                </li>
                <li data-todo-sidebar-list>
                    <Link to={`/${StandardProj.today}`}>
                        <span>
                            <MdToday />
                        </span>
                        <span>Today</span>
                    </Link>
                </li>
                <li data-todo-sidebar-list>
                    <Link to={`/${StandardProj.next7}`}>
                        <span>
                            <MdDateRange />
                        </span>
                        <span>Next 7 days</span>
                    </Link>
                </li>
            </ul>
            <HeaderContainer>
                <AccordionButton onClick={() => setShowProjects(!showProjects)}>
                    <IoMdArrowDropdown />

                    <h2>Projects</h2>
                </AccordionButton>

                <ul>{showProjects && <Projects />}</ul>
                {showProjects && <AddProject />}
            </HeaderContainer>
        </SidebarContainer>
    );
};

const AccordionButton = styled.button`
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    background: transparent;
    color: #fff;
    font-size: 0.875rem;
    svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.25rem;
    }
`;

const HeaderContainer = styled.header`
    display: inline-block;
    width: 266px;
    vertical-align: top;
    min-height: 1.5rem;
    line-height: 1.5rem;
    word-break: break-all;
    word-break: break-word;
    ul {
        position: relative;
    }
`;

const SidebarContainer = styled.div`
    position: relative;
    width: 266px;
    height: calc(100vh);
    padding-top: 62px;
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
    border-right: 3px;
    background: #1e1e1e;

    ul {
        margin: 0;
        padding: 0;
    }
    [data-todo-sidebar-list] {
        min-height: ${rems[32]};
        font-size: ${rems[16]};
        list-style: none;
        cursor: pointer;
        padding: ${rems[8]} ${rems[16]} ${rems[8]} ${rems[8]};
        transition: color 0.1s ease-in, background-color 0.1s ease-in;
        display: flex;
        align-items: center;
        &:hover {
            background: #cacaca;
        }
        a {
            color: #fff;
            text-decoration: none;
        }
    }
`;
