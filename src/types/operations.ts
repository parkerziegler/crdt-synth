export interface Op {
  type: "add" | "rmv" | null;
  id: string;
  payload: number;
}

export type ReplicaId = "1" | "2";
