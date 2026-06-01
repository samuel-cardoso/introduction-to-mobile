import { useEffect, useState } from "react";
import { Dimensions, Platform, Text } from "react-native";
import Constants from "expo-constants";

import { Card } from "@/components/Card";
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
      <Card title="Platform.OS">
        <Text className="mt-2 text-base text-slate-800">
          Você está em:{" "}
          <Text className="font-bold text-blue-600">{Platform.OS}</Text>
          {Platform.OS === "ios" && (Platform as { isPad?: boolean }).isPad
            ? " (iPad)"
            : ""}
        </Text>
      </Card>

      <Card title="Dimensões da janela">
        <Text className="mt-2 text-base text-slate-800">
          Largura: {Math.round(window.width)} px{"\n"}
          Altura: {Math.round(window.height)} px
        </Text>
      </Card>

      <Card title="Expo Constants">
        <Text className="mt-2 text-sm leading-5 text-slate-700">
          Nome do app: {Constants.expoConfig?.name ?? "—"}
          {"\n"}
          Versão: {Constants.expoConfig?.version ?? "—"}
          {"\n"}
          Ambiente: {Constants.executionEnvironment}
        </Text>
      </Card>
    </Screen>
  );
}
