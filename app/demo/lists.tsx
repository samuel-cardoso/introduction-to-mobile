import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { Card } from "@/components/Card";
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
      <Card title="Puxe para atualizar (pull-to-refresh)">
        <FlatList
          className="mt-3 max-h-72"
          data={items}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item }) => (
            <View className="rounded-xl bg-slate-100 px-4 py-3">
              <Text className="text-base text-slate-800">{item.label}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="py-4 text-center text-slate-500">Nenhum item</Text>
          }
        />
      </Card>
    </Screen>
  );
}
