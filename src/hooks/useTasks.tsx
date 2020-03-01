import { useState, useEffect } from 'react';
import { subscribeTo, fetchTasks } from '../helpers';
const cache: any = {};

export default function useTasks(uid: string, { listen } = { listen: true }) {
    const cached = cache[uid];
    const [tasks, setTasks] = useState(cached);
    useEffect(() => {
        if (listen) {
            return subscribeTo(uid, 'tasks', (tasks: any) => {
                cache[uid] = tasks;
                setTasks(tasks);
            });
        }
    }, [uid, listen]);

    return tasks;
}

export async function preloadTasks(uid: string) {
    cache[uid] = await fetchTasks(uid);
    return;
}
