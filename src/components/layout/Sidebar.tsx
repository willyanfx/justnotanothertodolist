import React from 'react';
import styled from 'styled-components';

export const Sidebar = () => {
    return (
        <SidebarElement>
            <SidebarUl>
                <li>
                    <div>
                        <i>📥</i>
                        <span>Inbox</span>
                    </div>
                </li>
                <li>
                    <div>
                        <i>📆</i>
                        <span>Today</span>
                    </div>
                </li>
                <li>
                    <div>
                        <i>🗓</i>
                        <span>Next 7 days</span>
                    </div>
                </li>
                <SidebarProjects>
                    <span>
                        <h2>Projects</h2>
                    </span>
                    <span>▾</span>

                    <ul></ul>
                </SidebarProjects>
            </SidebarUl>
        </SidebarElement>
    );
};

const SidebarElement = styled.div`
    width: 266px;
    height: calc(100vh);
    padding-top: 74px;
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
    border-right: 3px;
    background-color: #fafafa;
`;
const SidebarUl = styled.ul``;
const SidebarProjects = styled.div``;
