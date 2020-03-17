import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AddProject from '../AddProject';
import Projects from '../Projects';
import { StandardProj } from '../../types';
import { rems } from '../../constants/tokens';
import { Today, Next7, Inbox, ArrowDown } from '../Icons';

export const Sidebar = () => {
    const [showProjects, setShowProjects] = useState<boolean>(true);

    return (
        <SidebarContainer>
            <SidebarUl>
                <li data-todo-sidebar-list>
                    <Link to={`/${StandardProj.inbox}`}>
                        <Inbox />
                        <span>Inbox</span>
                    </Link>
                </li>
                <li data-todo-sidebar-list>
                    <Link to={`/${StandardProj.today}`}>
                        <Today />
                        <span>Today</span>
                    </Link>
                </li>
                <li data-todo-sidebar-list>
                    <Link to={`/${StandardProj.next7}`}>
                        <Next7 />
                        <span>Next 7 days</span>
                    </Link>
                </li>
            </SidebarUl>
            <ProjectContainer>
                <AccordionButton onClick={() => setShowProjects(!showProjects)}>
                    <ArrowDown />
                    <h2>Projects</h2>
                </AccordionButton>

                <ul>{showProjects && <Projects />}</ul>
                {showProjects && <AddProject />}
            </ProjectContainer>
        </SidebarContainer>
    );
};

const AccordionButton = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 ${rems[8]};
    background: transparent;
    margin-top: ${rems[16]};
    border: none;
    &:hover {
        background: ${props => props.theme.hover};
    }
    h2 {
        color: #fff;
        font-size: ${rems[16]};
        line-height: ${rems[20]};
    }
    svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.25rem;
    }
`;

const ProjectContainer = styled.header`
    display: inline-block;
    width: 266px;
    vertical-align: top;
    min-height: 1.5rem;
    line-height: 1.5rem;
    word-break: break-all;
    word-break: break-word;
    ul {
        margin: 0;
        padding: 0;
        position: relative;
        border-bottom: 1px solid ${props => props.theme.divider};
        margin-bottom: ${rems[16]};

    }
`;

const SidebarUl = styled.ul`
    margin: 0;
    padding: 0;
    li {
        margin: 0;
        span{
            margin-left: ${rems[8]}
        }
    }
`

const SidebarContainer = styled.div`
    position: relative;
    width: 266px;
    height: calc(100vh);
    padding-top: 62px;
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
    border-right: 3px;
    background: ${props => props.theme.body};
    color: ${props => props.theme.text}

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
            background:  ${props => props.theme.hover};
        }
        a {
            color: ${props => props.theme.text};
            text-decoration: none;
            margin-left: ${rems[4]}
        }
    }
`;
