import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";

export default function InputsDemoScreen() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Digite pelo menos 2 caracteres.");
      return;
    }
    setError(null);
    Alert.alert("Olá!", `Bem-vindo(a), ${trimmed}.`);
    setName("");
  }

  return (
    <Screen
      title="Formulários"
      subtitle="Inputs controlados: o valor vive no estado (useState) e volta para o TextInput via value + onChangeText."
    >
      <Card title="TextInput controlado">
        <TextInput
          className="mt-3 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900"
          placeholder="Seu nome"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (error) setError(null);
          }}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        {error ? <Text className="mt-2 text-sm text-red-600">{error}</Text> : null}
        <View className="mt-4">
          <Button label="Enviar" onPress={handleSubmit} />
        </View>
      </Card>

      <Card title="Dica">
        <Text className="mt-2 text-sm leading-5 text-slate-600">
          Use keyboardShouldPersistTaps no ScrollView (já configurado no componente Screen)
          para botões funcionarem com o teclado aberto.
        </Text>
      </Card>
    </Screen>
  );
}
