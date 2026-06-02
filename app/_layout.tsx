import "react-native-gesture-handler";
import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { HeroUINativeProvider } from "heroui-native";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <HeroUINativeProvider config={{ devInfo: { stylingPrinciples: false } }}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#f8fafc" },
            headerTintColor: "#0f172a",
            headerTitleStyle: { fontWeight: "600" },
            contentStyle: { backgroundColor: "#f8fafc" },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Intro Mobile" }} />
          <Stack.Screen name="demo/layout" options={{ title: "Layout" }} />
          <Stack.Screen name="demo/inputs" options={{ title: "Formulários" }} />
          <Stack.Screen name="demo/lists" options={{ title: "Listas" }} />
          <Stack.Screen name="demo/platform" options={{ title: "Plataforma" }} />
          <Stack.Screen name="demo/camera" options={{ title: "Image Picker" }} />
          <Stack.Screen name="demo/camera-view" options={{ title: "expo-camera" }} />
          <Stack.Screen name="tasks/index" options={{ title: "Tarefas" }} />
          <Stack.Screen name="tasks/new" options={{ title: "Nova tarefa" }} />
        </Stack>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
