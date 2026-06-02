import { router } from "expo-router";
import {
  Button,
  Card,
  FieldError,
  Input,
  Spinner,
  TextField,
} from "heroui-native";
import { useState } from "react";
import { View } from "react-native";

import { Screen } from "@/components/Screen";
import { createTask, loadTasks, saveTasks } from "@/lib/tasks-storage";

export default function NewTaskScreen() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const trimmed = title.trim();
    if (trimmed.length < 2) {
      setError("A tarefa precisa ter pelo menos 2 caracteres.");
      return;
    }

    setSaving(true);
    try {
      const existing = await loadTasks();
      await saveTasks([createTask(trimmed), ...existing]);
      router.back();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen
      title="Nova tarefa"
      subtitle="Os dados serão salvos no dispositivo com AsyncStorage."
    >
      <Card>
        <Card.Header>
          <Card.Title>Título</Card.Title>
        </Card.Header>
        <Card.Body>
          <TextField isInvalid={!!error}>
            <Input
              placeholder="Ex.: Estudar FlatList"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (error) setError(null);
              }}
              autoFocus
            />
            {error ? <FieldError>{error}</FieldError> : null}
          </TextField>
        </Card.Body>
      </Card>

      <View className="gap-3">
        <Button onPress={handleSave} isDisabled={saving}>
          {saving ? <Spinner size="sm" color="inverse" /> : "Salvar"}
        </Button>
        <Button variant="secondary" onPress={() => router.back()}>
          Cancelar
        </Button>
      </View>
    </Screen>
  );
}
