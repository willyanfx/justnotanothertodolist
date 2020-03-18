import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAppState } from '../app-state';
import { createDoc } from '../helpers';
import { format as formatDate, addDays } from 'date-fns';
import useProject from '../hooks/useProject';
import { MenuItem, Menu, MenuButton, MenuList } from './MenuButton';
import { StandardProj } from '../types';
import { Input } from '../Styles'
import { PrimaryBtn, SecondaryBtn } from '../Styles';
import { Today, ProjectIcon } from './Icons';

export const AddTask: React.FC<{ onCancel?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) }>
    = ({ onCancel }) => {

        const [{ auth }] = useAppState();
        const [{ user }] = useAppState();
        const projects = useProject(user.uid);
        const [value, setValue] = useState<string>('');
        const [taskDate, setTaskDate] = useState('today');
        const [projectName, setProjectName] = useState('');

        const handleChange = useCallback((newValue) => {
            const text: string = newValue.currentTarget.value
            setValue(text)
        }, []);

        const handleSubmit = (event: React.SyntheticEvent) => {
            event.preventDefault();
            let projectId = projectName || taskDate;
            let collectedDate: string = '';

            if (projectId === 'TODAY') {
                collectedDate = formatDate(Date.now(), 'dd/MM/yyyy');
            } else if (projectId === 'NEXT_7DAYS') {
                collectedDate = formatDate(addDays(Date.now(), 6), 'dd/MM/yyyy');
            }



            createDoc(
                {
                    date: collectedDate,
                    uid: auth.uid,
                    task: value,
                    projectId,
                    archived: false
                },
                'tasks'
            ).then(() => {
                setValue('');
                setProjectName('');
            })

        };



        return (
            <Newtask>
                <Input value={value} placeholder='Add Task' onChange={handleChange} />
                <div>
                    <span>
                        <PrimaryBtn onClick={handleSubmit}>Add Task</PrimaryBtn>
                        <SecondaryBtn onClick={onCancel}>Cancel</SecondaryBtn>
                    </span>
                    <span>
                        <Menu>
                            <MenuButton>
                                <Today />
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={() => setTaskDate(StandardProj.inbox)}>
                                    Inbox
                        </MenuItem>

                                <MenuItem
                                    onClick={() => setTaskDate(StandardProj.today)}>
                                    Today
                        </MenuItem>
                                <MenuItem
                                    onClick={() => setTaskDate(StandardProj.next7)}>
                                    Next 7 days
                        </MenuItem>
                            </MenuList>
                        </Menu>
                        {projects && (
                            <Menu >
                                <MenuButton><ProjectIcon /> </MenuButton>
                                <MenuList>
                                    {projects.map((item: any) => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={() => setProjectName(item.name)}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        )}
                    </span>
                </div>
            </Newtask>
        );
    };

const Newtask = styled.div`
    color: ${props => props.theme.text};
    > div {
        display: flex;
        justify-content: space-between;
        > span {
            display: inline-grid;
            grid-auto-flow: column;
            grid-column-gap: 16px;
        }
    }
`;
