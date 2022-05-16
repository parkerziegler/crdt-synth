import { atom } from "jotai";
import zip from "lodash.zip";
import shuffle from "lodash.shuffle";

import { Op, OpType, OpTypeInt } from "../types/operations";

const INITIAL_OPERATION_COUNT = 5;

// Generate a random operation type for a given operation.
const seedOperationType = () => {
  const flip = Math.random();

  if (flip < 0.33) {
    return "add" as const;
  } else if (flip < 0.66) {
    return "rmv" as const;
  } else {
    return null;
  }
};

// Generate an initial set of operations, ensuring that at least
// one, but no more than 3, pairs of concurrent operations yield
// a conflict.
const generateOperations = ({ first }: { first: boolean }): Op[] => {
  const numConflicts = Math.floor(Math.random() * (3 - 1) + 1);

  const conflictingOps = new Array(numConflicts).fill(undefined).map(() => {
    // Ensure the two replicas always have differing types on conflict
    // concurrent operations.
    const firstType = Math.random() > 0.5 ? "add" : "rmv";
    const secondType = firstType === "add" ? "rmv" : "add";

    return {
      type: first ? (firstType as OpType) : (secondType as OpType),
      payload: Math.floor(Math.random() * 10),
      reconciled: false,
      first,
    };
  });

  const nonConflictingOps = new Array(INITIAL_OPERATION_COUNT - numConflicts)
    .fill(undefined)
    .map(() => {
      return {
        type: seedOperationType(),
        payload: Math.floor(Math.random() * 10),
        reconciled: false,
        first,
      };
    });

  // Shuffle the conflicting and non-conflicting operations.
  return shuffle(
    conflictingOps.concat(nonConflictingOps).map((op, i) => {
      return {
        ...op,
        id: `operation_${i}`,
      };
    })
  );
};

const replica1InitialOperations = generateOperations({ first: true });
const replica2InitialOperations = generateOperations({ first: false });

// The central application state that is modified by user actions.
export const operationsAtom = atom({
  "1": replica1InitialOperations,
  "2": replica2InitialOperations,
});

const OP_TYPE_TO_INT = {
  add: 1 as const,
  rmv: 0 as const,
};

// A derived atom that transforms the current operation state to
// pairs (o1, o2) that are fed to the program synthesizer.
export const pairedOperationsAtom = atom((get) => {
  const operations = get(operationsAtom);

  return zip(operations["1"], operations["2"]).map<[OpTypeInt, OpTypeInt]>(
    ([op1, op2]) => {
      const o1 = op1?.type ? OP_TYPE_TO_INT[op1.type] : -1;
      const o2 = op2?.type ? OP_TYPE_TO_INT[op2.type] : -1;

      return op1?.first ? [o1, o2] : [o2, o1];
    }
  );
});
