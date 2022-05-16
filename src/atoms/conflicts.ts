import { atom } from "jotai";

import { findConflictOpIndices } from "../helpers/commutativity";

import { operationsAtom } from "./operations";

export const conflictsAtom = atom((get) => {
  const operations = get(operationsAtom);

  return findConflictOpIndices(operations);
});
