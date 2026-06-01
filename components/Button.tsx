import { ActivityIndicator, Pressable, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
};

const variantStyles = {
  primary: "bg-blue-600",
  secondary: "border border-slate-300 bg-white",
  danger: "bg-red-600",
};

const labelStyles = {
  primary: "text-white",
  secondary: "text-slate-800",
  danger: "text-white",
};

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`items-center rounded-xl px-4 py-3 ${variantStyles[variant]} ${
        isDisabled ? "opacity-50" : "active:opacity-80"
      }`}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator color={variant === "secondary" ? "#334155" : "#fff"} />
      ) : (
        <Text className={`text-base font-semibold ${labelStyles[variant]}`}>{label}</Text>
      )}
    </Pressable>
  );
}
