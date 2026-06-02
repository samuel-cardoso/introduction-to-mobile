import type { LearningModule } from "./types";

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "layout",
    title: "Layout & Flexbox",
    description: "View, Text, flex, alinhamento e Safe Area.",
    href: "/demo/layout",
    topics: ["View", "Text", "flex", "SafeAreaView"],
  },
  {
    id: "inputs",
    title: "Formulários",
    description: "TextInput, estado controlado e validação simples.",
    href: "/demo/inputs",
    topics: ["TextInput", "useState", "Keyboard"],
  },
  {
    id: "lists",
    title: "Listas",
    description: "FlatList, keys e pull-to-refresh.",
    href: "/demo/lists",
    topics: ["FlatList", "keyExtractor", "RefreshControl"],
  },
  {
    id: "platform",
    title: "Plataforma",
    description: "Platform.OS, dimensões e diferenças iOS/Android.",
    href: "/demo/platform",
    topics: ["Platform", "Dimensions", "StatusBar"],
  },
  {
    id: "camera",
    title: "Câmera",
    description: "Permissões, captura de foto e preview com Image.",
    href: "/demo/camera",
    topics: ["ImagePicker", "Permissões", "Image"],
  },
  {
    id: "tasks",
    title: "Projeto: Tarefas",
    description: "CRUD completo com navegação e AsyncStorage.",
    href: "/tasks",
    topics: ["Navegação", "Estado", "Persistência"],
  },
];
