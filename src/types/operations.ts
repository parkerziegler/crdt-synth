export interface Op {
  type: "add" | "rmv" | null;
  id: string;
  payload: number;
  reconciled: boolean;
}

export type ReplicaId = "1" | "2";
