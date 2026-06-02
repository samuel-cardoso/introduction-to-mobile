import { Link } from "expo-router";
import { Card, Chip } from "heroui-native";
import { Pressable, View } from "react-native";

import type { LearningModule } from "@/lib/types";

type ModuleCardProps = {
  module: LearningModule;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={module.href} asChild>
      <Pressable className="active:opacity-80" accessibilityRole="button">
        <Card>
          <Card.Header>
            <Card.Title>{module.title}</Card.Title>
            <Card.Description>{module.description}</Card.Description>
          </Card.Header>
          <Card.Body>
            <View className="flex-row flex-wrap gap-2">
              {module.topics.map((topic) => (
                <Chip key={topic} size="sm" variant="soft" color="accent">
                  {topic}
                </Chip>
              ))}
            </View>
          </Card.Body>
        </Card>
      </Pressable>
    </Link>
  );
}
