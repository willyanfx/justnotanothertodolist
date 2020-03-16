import React, { useState, useEffect, FC } from 'react';
import { useAppState } from '../app-state';
import useProject from '../hooks/useProject';
import { deleteProject } from '../helpers';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosTrash } from 'react-icons/io';
import { rems } from '../constants/tokens';

type Proj = {
    createdAt: number;
    id: string;
    name: string;
    projectId: string;
    uid: string;
};

const Projects: React.FC = (): JSX.Element => {
    const [{ user }] = useAppState();
    const [projectCollection, setProjectCollection] = useState<Proj[]>([]);
    const projects = useProject(user.uid);
    useEffect(() => {
        if (projects) setProjectCollection(projects);
    }, [projects]);

    const projectDisplay = projectCollection.map(proj => (
        <ProjectLi data-todo-sidebar-list key={proj.id} tabIndex={0}>
            <Link
                to={`/${proj.name}`}
                aria-label={`Select ${proj.name} as the task project`}>
                {proj.name}
            </Link>
            <span onClick={() => deleteProject(proj.id)}>
                <IoIosTrash />
            </span>
        </ProjectLi>
    ));

    return <>{projectDisplay}</>;
};
export default Projects;

const ProjectLi = styled.li`
    display: flex;
    justify-content: space-between;
    height: ${rems[32]};

    span {
        background: transparent;
        border-radius: ${rems[4]};
        color: #fff;
    }
`;
