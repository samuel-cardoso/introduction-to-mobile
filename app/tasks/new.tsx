import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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
    <Screen title="Nova tarefa" subtitle="Os dados serão salvos no dispositivo com AsyncStorage.">
      <Card title="Título">
        <TextInput
          className="mt-3 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900"
          placeholder="Ex.: Estudar FlatList"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (error) setError(null);
          }}
          autoFocus
        />
        {error ? <Text className="mt-2 text-sm text-red-600">{error}</Text> : null}
      </Card>

      <View className="gap-3">
        <Button label="Salvar" onPress={handleSave} loading={saving} />
        <Button label="Cancelar" variant="secondary" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
