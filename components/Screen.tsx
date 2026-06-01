import { type ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  scroll?: boolean;
};

export function Screen({ title, subtitle, children, scroll = true }: ScreenProps) {
  const body = (
    <View className="gap-4 px-4 pb-8 pt-2">
      <View className="gap-1">
        <Text className="text-2xl font-bold text-slate-900">{title}</Text>
        {subtitle ? (
          <Text className="text-base text-slate-600">{subtitle}</Text>
        ) : null}
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top", "left", "right"]}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow"
          keyboardShouldPersistTaps="handled"
        >
          {body}
        </ScrollView>
      ) : (
        <View className="flex-1">{body}</View>
      )}
    </SafeAreaView>
  );
}
