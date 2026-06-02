import { Card } from "heroui-native";
import { Text, View } from "react-native";

import { Screen } from "@/components/Screen";

export default function LayoutDemoScreen() {
  return (
    <Screen
      title="Layout & Flexbox"
      subtitle="No mobile, quase tudo é posicionado com flex — não com float ou grid como na web."
    >
      <Card>
        <Card.Header>
          <Card.Title>flexDirection: row</Card.Title>
        </Card.Header>
        <Card.Body>
          <View className="flex-row gap-2">
            <View className="h-12 flex-1 items-center justify-center rounded-lg bg-blue-500">
              <Text className="font-medium text-white">1</Text>
            </View>
            <View className="h-12 flex-1 items-center justify-center rounded-lg bg-blue-400">
              <Text className="font-medium text-white">2</Text>
            </View>
            <View className="h-12 flex-1 items-center justify-center rounded-lg bg-blue-300">
              <Text className="font-medium text-slate-800">3</Text>
            </View>
          </View>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>justifyContent & alignItems</Card.Title>
        </Card.Header>
        <Card.Body>
          <View className="h-32 items-center justify-center rounded-lg bg-surface-secondary">
            <View className="rounded-full bg-emerald-500 px-4 py-2">
              <Text className="font-semibold text-white">centralizado</Text>
            </View>
          </View>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>flex: 1 (preenche o espaço)</Card.Title>
        </Card.Header>
        <Card.Body className="gap-2">
          <View className="h-24 flex-row gap-2">
            <View className="w-16 rounded-lg bg-amber-400" />
            <View className="flex-1 rounded-lg bg-amber-200" />
          </View>
          <Text className="text-sm text-muted">
            A barra da direita usa flex: 1 e ocupa o restante da linha.
          </Text>
        </Card.Body>
      </Card>
    </Screen>
  );
}
