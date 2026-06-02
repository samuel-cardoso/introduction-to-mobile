import { Button, Card, FieldError, Input, TextField } from "heroui-native";
import { useState } from "react";
import { Alert, Text } from "react-native";

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
      <Card>
        <Card.Header>
          <Card.Title className="m-2" >TextField controlado</Card.Title>
        </Card.Header>
        <Card.Body className="gap-4">
          <TextField isInvalid={!!error}>
            <Input
              placeholder="Seu nome"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (error) setError(null);
              }}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            {error ? <FieldError>{error}</FieldError> : null}
          </TextField>
          <Button onPress={handleSubmit}>Enviar</Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Dica</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text className="text-sm leading-5 text-muted">
            Use keyboardShouldPersistTaps no ScrollView (já configurado no
            componente Screen) para botões funcionarem com o teclado aberto.
          </Text>
        </Card.Body>
      </Card>
    </Screen>
  );
}
