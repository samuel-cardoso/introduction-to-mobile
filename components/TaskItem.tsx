import { Button, Checkbox, Surface } from "heroui-native";
import { Text, View } from "react-native";

import type { Task } from "@/lib/types";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <Surface className="flex-row items-center gap-3 p-3">
      <Checkbox
        isSelected={task.done}
        onSelectedChange={() => onToggle(task.id)}
      />

      <Text
        className={`flex-1 text-base ${
          task.done ? "text-muted line-through" : "text-foreground"
        }`}
      >
        {task.title}
      </Text>

      <Button
        variant="danger-soft"
        size="sm"
        onPress={() => onDelete(task.id)}
        accessibilityLabel={`Excluir ${task.title}`}
      >
        Excluir
      </Button>
    </Surface>
  );
}
