import { Surface } from "heroui-native";
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
      <Surface className="bg-accent p-4">
        <Text className="text-sm font-medium text-accent-foreground opacity-80">
          React Native + Expo 54
        </Text>
        <Text className="mt-1 text-lg font-bold text-accent-foreground">
          Playground para aprender o essencial
        </Text>
      </Surface>

      <View className="gap-3">
        {LEARNING_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </View>
    </Screen>
  );
}
