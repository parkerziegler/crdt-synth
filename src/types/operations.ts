export interface Op {
  type: "add" | "rmv" | null;
  id: string;
  payload: number;
  reconciled: boolean;
  first: boolean;
}

export type ReplicaId = "1" | "2";

export interface Replicas {
  "1": Op[];
  "2": Op[];
}
