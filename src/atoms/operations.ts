import { atom } from "jotai";
import { Op, ReplicaId } from "../types/operations";

const seedOperationType = () => {
  if (Math.random() < 0.33) {
    return "add" as const;
  } else if (Math.random() < 0.66) {
    return "rmv" as const;
  } else {
    return null;
  }
};

const generateOperations = (): Op[] => {
  return new Array(5).fill(undefined).map((_, i) => {
    return {
      id: `operation_${i}`,
      type: seedOperationType(),
      payload: Math.floor(Math.random() * 10),
      reconciled: false,
    };
  });
};

const replica1InitialOperations = generateOperations();
const replica2InitialOperations = generateOperations();

const initialOperations = {
  "1": replica1InitialOperations,
  "2": replica2InitialOperations,
};

export const operationsAtom = atom(initialOperations);
