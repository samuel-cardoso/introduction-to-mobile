import { Text, View } from "react-native";
import { Link } from "expo-router";

import type { LearningModule } from "@/lib/types";

import { Card } from "./Card";

type ModuleCardProps = {
  module: LearningModule;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={module.href} asChild>
      <Card title={module.title} description={module.description}>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {module.topics.map((topic) => (
            <View key={topic} className="rounded-full bg-blue-50 px-3 py-1">
              <Text className="text-xs font-medium text-blue-700">{topic}</Text>
            </View>
          ))}
        </View>
      </Card>
    </Link>
  );
}
