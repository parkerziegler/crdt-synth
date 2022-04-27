import { atom } from "jotai";
import { Op } from "../types/operations";

const seedOperationType = () => {
  if (Math.random() < 0.33) {
    return "add" as const;
  } else if (Math.random() < 0.66) {
    return "rmv" as const;
  } else {
    return null;
  }
};

const generateOperations = ({ first }: { first: boolean }): Op[] => {
  return new Array(5).fill(undefined).map((_, i) => {
    return {
      id: `operation_${i}`,
      type: seedOperationType(),
      payload: Math.floor(Math.random() * 10),
      reconciled: false,
      first,
    };
  });
};

const replica1InitialOperations = generateOperations({ first: true });
const replica2InitialOperations = generateOperations({ first: false });

export const operationsAtom = atom({
  "1": replica1InitialOperations,
  "2": replica2InitialOperations,
});
