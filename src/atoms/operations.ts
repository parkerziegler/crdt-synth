import { atom } from "jotai";
import zip from "lodash.zip";

import { Op, OpTypeInt } from "../types/operations";

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

const opTypeToInt = {
  add: 1 as const,
  rmv: 0 as const,
};

export const pairedOperationsAtom = atom((get) => {
  const operations = get(operationsAtom);

  return zip(operations["1"], operations["2"]).map<[OpTypeInt, OpTypeInt]>(
    ([op1, op2]) => {
      const o1 = op1?.type ? opTypeToInt[op1.type] : -1;
      const o2 = op2?.type ? opTypeToInt[op2.type] : -1;

      return op1?.first ? [o1, o2] : [o2, o1];
    }
  );
});
