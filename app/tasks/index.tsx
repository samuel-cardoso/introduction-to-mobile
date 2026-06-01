import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { TaskItem } from "@/components/TaskItem";
import { loadTasks, saveTasks } from "@/lib/tasks-storage";
import type { Task } from "@/lib/types";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        setLoading(true);
        const stored = await loadTasks();
        if (active) {
          setTasks(stored);
          setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, []),
  );

  async function persist(next: Task[]) {
    setTasks(next);
    await saveTasks(next);
  }

  function toggleTask(id: string) {
    const next = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    void persist(next);
  }

  function deleteTask(id: string) {
    const next = tasks.filter((t) => t.id !== id);
    void persist(next);
  }

  const pending = tasks.filter((t) => !t.done).length;

  return (
    <Screen
      title="Projeto: Tarefas"
      subtitle="Lista + formulário + navegação + AsyncStorage — o que você usa no dia a dia."
      scroll={false}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-slate-600">
          {pending} pendente{pending === 1 ? "" : "s"} · {tasks.length} no total
        </Text>
        <Button label="Nova tarefa" onPress={() => router.push("/tasks/new")} />
      </View>

      {loading ? (
        <ActivityIndicator className="mt-8" size="large" color="#2563eb" />
      ) : (
        <FlatList
          className="mt-4 flex-1"
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-2 grow pb-4"
          ItemSeparatorComponent={() => <View className="h-0" />}
          renderItem={({ item }) => (
            <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
          )}
          ListEmptyComponent={
            <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8">
              <Text className="text-center text-slate-600">
                Nenhuma tarefa ainda.{"\n"}Toque em &quot;Nova tarefa&quot; para começar.
              </Text>
            </View>
          }
        />
      )}
    </Screen>
  );
}
