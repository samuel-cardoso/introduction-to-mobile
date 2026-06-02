import { Card } from "heroui-native";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { Screen } from "@/components/Screen";

const INITIAL_ITEMS = [
  { id: "1", label: "Aprender View e Text" },
  { id: "2", label: "Praticar FlatList" },
  { id: "3", label: "Configurar navegação" },
  { id: "4", label: "Persistir dados localmente" },
];

export default function ListsDemoScreen() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setItems((current) => [...current].reverse());
      setRefreshing(false);
    }, 800);
  }, []);

  return (
    <Screen
      title="Listas"
      subtitle="FlatList renderiza só o que está visível — ideal para listas longas no mobile."
      scroll={false}
    >
      <Card>
        <Card.Header>
          <Card.Title>Puxe para atualizar (pull-to-refresh)</Card.Title>
        </Card.Header>
        <Card.Body>
          <FlatList
            className="max-h-72"
            data={items}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ItemSeparatorComponent={() => <View className="h-2" />}
            renderItem={({ item }) => (
              <View className="rounded-xl bg-surface-secondary px-4 py-3">
                <Text className="text-base text-foreground">{item.label}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text className="py-4 text-center text-muted">
                Nenhum item
              </Text>
            }
          />
        </Card.Body>
      </Card>
    </Screen>
  );
}
