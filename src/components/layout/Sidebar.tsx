import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import AddProject from '../AddProject';
import Projects from '../Projects';
import { StandardProj } from '../../types';

export const Sidebar = () => {
    const [showProjects, setShowProjects] = useState<boolean>(true);

    return (
        <SidebarContainer>
            <ul>
                <li>
                    <Link to={`/${StandardProj.inbox}`}>
                        <span>📥</span>
                        <span css={styleContent}>Inbox</span>
                    </Link>
                </li>
                <li>
                    <Link to={`/${StandardProj.today}`}>
                        <span>📆</span>
                        <span css={styleContent}>Today</span>
                    </Link>
                </li>
                <li>
                    <Link to={`/${StandardProj.next7}`}>
                        <span>🗓</span>
                        <span css={styleContent}>Next 7 days</span>
                    </Link>
                </li>
            </ul>
            <HeaderContainer>
                <AccordionButton onClick={() => setShowProjects(!showProjects)}>
                    <span>▾</span>
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
    height: 32px;
    background: transparent;
    color: #fff;
    span {
    }
`;

const HeaderContainer = styled.header`
    display: inline-block;
    width: 100%;
    vertical-align: top;
    min-height: 24px;
    line-height: 24px;
    word-break: break-all;
    word-break: break-word;
`;

const SidebarContainer = styled.div`
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
    li {
        min-height: 24px;
        font-size: 14px;
        list-style: none;
        cursor: pointer;
        padding: 8px 16px 8px 8px;
        transition: color 0.1s ease-in, background-color 0.1s ease-in;
        display: flex;
        border-radius: 3px;
        align-items: center;
        a {
            color: #fff;
        }
    }
`;

const styleContent = css`
    display: inline-block;
    width: 187px;
    vertical-align: top;
    min-height: 24px;
    line-height: 24px;
    word-break: break-all;
    word-break: break-word;
`;
