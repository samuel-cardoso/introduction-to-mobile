import { type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type CardProps = {
  title: string;
  description?: string;
  onPress?: () => void;
  children?: ReactNode;
  className?: string;
};

export function Card({
  title,
  description,
  onPress,
  children,
  className = "",
}: CardProps) {
  const content = (
    <View className={`rounded-2xl border border-slate-200 bg-white p-4 ${className}`}>
      <Text className="text-lg font-semibold text-slate-900">{title}</Text>
      {description ? (
        <Text className="mt-1 text-sm text-slate-600">{description}</Text>
      ) : null}
      {children}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-80"
      accessibilityRole="button"
    >
      {content}
    </Pressable>
  );
}
