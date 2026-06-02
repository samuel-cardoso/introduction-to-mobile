import { type ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
        <Text className="text-2xl font-bold text-foreground">{title}</Text>
        {subtitle ? (
          <Text className="text-base text-muted">{subtitle}</Text>
        ) : null}
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <View className="flex-1 bg-background">
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});
