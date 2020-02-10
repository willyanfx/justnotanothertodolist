import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from './Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
    const custom = {
        id: `id-${k}`,
        content: `Quote ${k}`
    };

    return custom;
});

const GRID = 8;

function ListItem({ item, index }: any) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <TodoItems
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Checkbox />
                    <span>{item.content}</span>
                </TodoItems>
            )}
        </Draggable>
    );
}

// Ensuring the whole list does not re-render when the droppable re-renders
const TasksList = React.memo(function TasksList({ items }: any) {
    return items.map((item: { id: number }, index: number) => (
        <ListItem item={item} index={index} key={item.id} />
    ));
});

const reorder = (
    list: Iterable<unknown> | ArrayLike<unknown>,
    startIndex: any,
    endIndex: any
) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const Tasks = () => {
    const [tasks, setTasks] = useState(initial);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newList: any = reorder(
            tasks,
            result.source.index,
            result.destination.index
        );

        setTasks(newList);
    };

    return (
        <TaskDisplay>
            <h2>Project name</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='list'>
                    {provided => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <TasksList items={tasks} />
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </DragDropContext>
        </TaskDisplay>
    );
};

const TaskDisplay = styled.div`
    width: 656px;
    background-color: white;
    margin-left: 266px;
    border-right: 3px;
    vertical-align: top;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 80px;
    padding-bottom: 84px;

    h2 {
        font-size: 20px;
        font-weight: normal;
        margin: 0 30px 20px 0;
    }
`;

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 18px;
    color: #333;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    list-style-type: none;
    border-bottom: 1px solid #f0f0f0;
`;

const TodoItems = styled.div`
    display: flex;
    width: 100%;
    border: 1px solid grey;
    margin-bottom: ${GRID}px;
    background-color: #fff;
    padding: ${GRID}px;
`;
