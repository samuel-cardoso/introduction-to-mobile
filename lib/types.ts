export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type ModuleId =
  | "layout"
  | "inputs"
  | "lists"
  | "platform"
  | "tasks";

export type LearningModule = {
  id: ModuleId;
  title: string;
  description: string;
  href:
    | "/demo/layout"
    | "/demo/inputs"
    | "/demo/lists"
    | "/demo/platform"
    | "/tasks";
  topics: string[];
};
