import React, { useState, useEffect, FC } from 'react';
import { useAppState } from '../app-state';
import useProject from '../hooks/useProject';
import { deleteProject } from '../helpers';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { rems } from '../constants/tokens';
import { Delete } from './Assets/Icons';

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
		if (projects) setProjectCollection(projects!);
	}, [projects]);

	const projectDisplay = projectCollection.map(proj => (
		<ProjectLi data-todo-sidebar-list key={proj.id} tabIndex={0}>
			<Link
				to={`/${proj.name}`}
				aria-label={`Select ${proj.name} as the task project`}>
				{proj.name}
			</Link>
			<button
				aria-label="delete button"
				onClick={() => deleteProject(proj.id)}>
				<Delete />
			</button>
		</ProjectLi>
	));

	return <>{projectDisplay}</>;
};
export default Projects;

const ProjectLi = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: ${rems[32]};
	width: 100%;
	button {
		background: transparent;
		border: none;
		height: ${rems[24]};
		cursor: pointer;
		svg {
			width: ${rems[20]};
			color: ${props => props.theme.text};
			height: ${rems[20]};
		}
	}
`;
