import { useState, useEffect } from 'react';
import { fetchProject, subscribeTo } from '../helpers';

const cache: any = {};
export default function useProject(uid: string, { listen } = { listen: true }) {
    const [project, setProject] = useState();
    useEffect(() => {
        if (listen) {
            return subscribeTo(uid, 'projects', (projects: any) => {
                cache[uid] = projects;
                setProject(projects);
            });
        }
    }, [listen, uid]);

    return project;
}
export async function preloadProjects(uid: string) {
    cache[uid] = await fetchProject(uid);
    return;
}
