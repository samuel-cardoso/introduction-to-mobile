import { Text, View } from "react-native";

import { ModuleCard } from "@/components/ModuleCard";
import { Screen } from "@/components/Screen";
import { LEARNING_MODULES } from "@/lib/modules";

export default function HomeScreen() {
  return (
    <Screen
      title="Introdução ao Mobile"
      subtitle="Toque em um módulo para ver conceitos básicos de React Native com Expo."
      scroll
    >
      <View className="rounded-2xl bg-blue-600 p-4">
        <Text className="text-sm font-medium text-blue-100">React Native + Expo 54</Text>
        <Text className="mt-1 text-lg font-bold text-white">
          Playground para aprender o essencial
        </Text>
      </View>

      <View className="gap-3">
        {LEARNING_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </View>
    </Screen>
  );
}
