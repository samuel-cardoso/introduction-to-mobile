import { Pressable, Text, View } from "react-native";

import type { Task } from "@/lib/types";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <Pressable
        onPress={() => onToggle(task.id)}
        className={`h-6 w-6 items-center justify-center rounded-md border-2 ${
          task.done ? "border-green-600 bg-green-600" : "border-slate-300 bg-white"
        }`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.done }}
      >
        {task.done ? <Text className="text-xs font-bold text-white">✓</Text> : null}
      </Pressable>

      <Text
        className={`flex-1 text-base ${
          task.done ? "text-slate-400 line-through" : "text-slate-900"
        }`}
      >
        {task.title}
      </Text>

      <Pressable
        onPress={() => onDelete(task.id)}
        className="rounded-lg px-2 py-1 active:bg-red-50"
        accessibilityRole="button"
        accessibilityLabel={`Excluir ${task.title}`}
      >
        <Text className="text-sm font-medium text-red-600">Excluir</Text>
      </Pressable>
    </View>
  );
}
