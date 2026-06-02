import Constants from "expo-constants";
import { Card } from "heroui-native";
import { useEffect, useState } from "react";
import { Dimensions, Platform, Text } from "react-native";

import { Screen } from "@/components/Screen";

export default function PlatformDemoScreen() {
  const [window, setWindow] = useState(Dimensions.get("window"));

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window: next }) => {
      setWindow(next);
    });
    return () => sub.remove();
  }, []);

  return (
    <Screen
      title="Plataforma"
      subtitle="Adaptações por SO, tamanho de tela e ambiente de execução."
    >
      <Card>
        <Card.Header>
          <Card.Title>Platform.OS</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text className="text-base text-foreground">
            Você está em:{" "}
            <Text className="font-bold text-accent">{Platform.OS}</Text>
            {Platform.OS === "ios" && (Platform as { isPad?: boolean }).isPad
              ? " (iPad)"
              : ""}
          </Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Dimensões da janela</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text className="text-base text-foreground">
            Largura: {Math.round(window.width)} px{"\n"}
            Altura: {Math.round(window.height)} px
          </Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Expo Constants</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text className="text-sm leading-5 text-muted">
            Nome do app: {Constants.expoConfig?.name ?? "—"}
            {"\n"}
            Versão: {Constants.expoConfig?.version ?? "—"}
            {"\n"}
            Ambiente: {Constants.executionEnvironment}
          </Text>
        </Card.Body>
      </Card>
    </Screen>
  );
}
