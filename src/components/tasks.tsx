import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { Checkbox } from './Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppState } from '../app-state';
import useTasks from '../hooks/useTasks';
import { AddTask } from './AddTask';
import { deleteTask, doneTask } from '../helpers';
import { useParams } from 'react-router-dom';
import { StandardProj, AddTaskProps } from '../types';
import AddDialog from './AddDialog';
import { DialogStateContext, DialogSetContext } from '../context/DialogContext';

import { IoIosTrash } from 'react-icons/io';
import { rems } from '../constants/tokens';
import { Button } from './Buttons';
{/* <Checkbox onClick={() => doneTask(item.id)} /> */ }
function ListItem({ item, index }: { item: AddTaskProps; index: number }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <ListItemDiv
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <span>
                        <Checkbox onClick={() => console.log(item.id)} />
                        <h4>{item.task}</h4>
                    </span>

                    <span onClick={() => deleteTask(item.id)}>
                        <IoIosTrash />
                    </span>
                </ListItemDiv>
            )}
        </Draggable>
    );
}

// Ensuring the whole list does not re-render when the droppable re-renders
const TasksList = React.memo(function TasksList({ items }: any) {
    return items.map((item: AddTaskProps, index: number) => (
        <ListItem item={item} index={index} key={item.id} />
    ));
});

const reorder = (
    list: Iterable<unknown> | ArrayLike<unknown>,
    startIndex: number,
    endIndex: number
) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const Tasks = () => {
    const [taskItems, setTasksItems] = useState([]);
    const [showAddTask, setShowAddTask] = useState(true);
    const showModal = useContext(DialogStateContext);
    const setShowModal = useContext(DialogSetContext);
    const [{ user }] = useAppState();
    let { id } = useParams();
    let selectedProject = String(id);

    const tasks = useTasks(user.uid, selectedProject);
    useEffect(() => {
        if (tasks) setTasksItems(tasks);
    }, [tasks]);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }

        const newList: any = reorder(
            taskItems,
            result.source.index,
            result.destination.index
        );

        setTasksItems(newList);
    };

    let title: string;
    switch (id) {
        case StandardProj.inbox:
            title = 'Inbox';
            break;
        case StandardProj.today:
            title = 'Today';
            break;
        case StandardProj.next7:
            title = 'Next 7 Days';
            break;
        default:
            title = String(id);
    }

    return (
        <>
            <AddDialog
                isOpen={showModal}
                onDismiss={() => setShowModal(!showModal)}>
                <AddTask />
            </AddDialog>
            <DisplayItem>
                <h2>{title}</h2>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='list'>
                        {provided => (
                            <List
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <TasksList items={taskItems} />
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
                <AddTaskDiv>
                    <Button onClick={() => setShowAddTask(!showAddTask)}>
                        <span>+</span>
                        <span>Add Task</span>
                    </Button>
                    {showAddTask && (
                        <AddTask
                            onCancel={() => setShowAddTask(!showAddTask)}
                        />
                    )}
                </AddTaskDiv>
            </DisplayItem>
        </>
    );
};

const GRID = 0.5;

const AddTaskDiv = styled.div`
    border-top: 1px solid #999999;
    margin-top: ${rems[16]};
    padding-top: ${rems[16]};
`;

const DisplayItem = styled.div`
    width: 41rem;
    background: ${props => props.theme.background};
    color: #fff;
    margin-left: 16.625rem;
    border-right: ${rems[4]};
    vertical-align: top;
    padding-left: ${rems[40]};
    padding-right: ${rems[40]};
    padding-top: 80px;
    padding-bottom: 84px;
    h2 {
        font-size: ${rems[20]};
        font-weight: normal;
        margin: 0 ${rems[30]} ${rems[20]} 0;
    }
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListItemDiv = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: #333;
    border-radius: ${rems[4]};
    margin-bottom: ${GRID}rem;
    padding: ${rems[16]} ${rems[16]};
    align-items: center;
    justify-content: space-between;
    span {
        display: flex;
        flex-direction: row;
    }
    h4 {
        font-size: ${rems[20]};
        padding: 0;
        margin: 0;
        margin-left: ${rems[8]};
    }
`;
