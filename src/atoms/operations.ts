import { atom } from "jotai";
import zip from "lodash.zip";
import shuffle from "lodash.shuffle";
import random from "lodash.random";

import { Op, OpType, OpTypeInt, Replicas } from "../types/operations";

const INITIAL_OPERATION_COUNT = 5;
const MAX_OPERATION_PAYLOAD = 10;

// Seed a conflicting pair of concurrent operations.
const seedConflict = (): [OpType, OpType] => {
  const flip = Math.random();

  const op1Type = flip > 0.5 ? "add" : "rmv";
  const op2Type = op1Type === "add" ? "rmv" : "add";

  return [op1Type, op2Type];
};

// Seed a non-conflicting pair of concurrent operations.
const seedNonConflict = (): [OpType, OpType] => {
  const flip = Math.random();

  if (flip < 0.33) {
    const op2Type = Math.random() > 0.5 ? "add" : null;

    return ["add", op2Type];
  } else if (flip < 0.66) {
    const op2Type = Math.random() > 0.5 ? "rmv" : null;

    return ["rmv", op2Type];
  } else {
    const op2Type = Math.random() > 0.5 ? "add" : "rmv";

    return [null, op2Type];
  }
};

// Generate an initial set of operations, ensuring that at least
// one, but no more than 3, pairs of concurrent operations yield
// a conflict.
const generateOperations = (): Replicas => {
  const replicas: Replicas = {
    1: [],
    2: [],
  };

  // Derive a random number of conflicts within the range [1, 3].
  const numConflicts = random(1, 3);
  const conflictPairs = new Array(numConflicts).fill(undefined).map(() => {
    const [op1Type, op2Type] = seedConflict();

    const replica1Op = {
      type: op1Type,
      payload: Math.floor(Math.random() * MAX_OPERATION_PAYLOAD),
      reconciled: false,
      first: true,
    };

    const replica2Op = {
      type: op2Type,
      payload: Math.floor(Math.random() * MAX_OPERATION_PAYLOAD),
      reconciled: false,
      first: false,
    };

    return [replica1Op, replica2Op];
  });

  // Seed the remaining operations with random non-conflicts.
  const numNonConflicts = INITIAL_OPERATION_COUNT - numConflicts;
  const nonConflictPairs = new Array(numNonConflicts)
    .fill(undefined)
    .map(() => {
      const [op1Type, op2Type] = seedNonConflict();

      const replica1Op = {
        type: op1Type,
        payload: Math.floor(Math.random() * MAX_OPERATION_PAYLOAD),
        reconciled: false,
        first: true,
      };

      const replica2Op = {
        type: op2Type,
        payload: Math.floor(Math.random() * MAX_OPERATION_PAYLOAD),
        reconciled: false,
        first: false,
      };

      return [replica1Op, replica2Op];
    });

  // Shuffle the conflicting and non-conflicting operations.
  const pairs = shuffle(conflictPairs.concat(nonConflictPairs));

  // Push the operations into their respective "replicas".
  for (const [i, [op1, op2]] of pairs.entries()) {
    replicas["1"].push({
      ...op1,
      id: `operation_${i}`,
    });

    replicas["2"].push({
      ...op2,
      id: `operation_${i}`,
    });
  }

  return replicas;
};

// The central application state that is modified by user actions.
export const operationsAtom = atom(generateOperations());

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
