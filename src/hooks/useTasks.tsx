import { useState, useEffect } from 'react';
import { subscribeTo } from '../helpers';
const cache: any = {};

export default function useTasks(uid: string, { listen } = { listen: true }) {
    const cached = cache[uid];
    const [tasks, setTasks] = useState(cached);
    useEffect(() => {
        if (listen) {
            return subscribeTo(uid, (tasks: any) => {
                cache[uid] = tasks;
                setTasks(tasks);
            });
        }
    }, [uid, listen]);

    return tasks;
}
