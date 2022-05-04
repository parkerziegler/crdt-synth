export type OpType = "add" | "rmv" | null;
export type OpTypeInt = 1 | 0 | -1;

export interface Op {
  type: OpType;
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
