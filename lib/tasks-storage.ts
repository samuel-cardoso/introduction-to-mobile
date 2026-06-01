import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Task } from "./types";

const STORAGE_KEY = "@intro-mobile/tasks";

export async function loadTasks(): Promise<Task[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function createTask(title: string): Task {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: title.trim(),
    done: false,
    createdAt: Date.now(),
  };
}
