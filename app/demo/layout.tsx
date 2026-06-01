import { Text, View } from "react-native";

import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";

export default function LayoutDemoScreen() {
  return (
    <Screen
      title="Layout & Flexbox"
      subtitle="No mobile, quase tudo é posicionado com flex — não com float ou grid como na web."
    >
      <Card title="flexDirection: row">
        <View className="mt-3 flex-row gap-2">
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
      </Card>

      <Card title="justifyContent & alignItems">
        <View className="mt-3 h-32 items-center justify-center rounded-lg bg-slate-100">
          <View className="rounded-full bg-emerald-500 px-4 py-2">
            <Text className="font-semibold text-white">centralizado</Text>
          </View>
        </View>
      </Card>

      <Card title="flex: 1 (preenche o espaço)">
        <View className="mt-3 h-24 flex-row gap-2">
          <View className="w-16 rounded-lg bg-amber-400" />
          <View className="flex-1 rounded-lg bg-amber-200" />
        </View>
        <Text className="mt-2 text-sm text-slate-600">
          A barra da direita usa flex: 1 e ocupa o restante da linha.
        </Text>
      </Card>
    </Screen>
  );
}
