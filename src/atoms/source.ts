import { atom } from "jotai";

const INITIAL_SOURCE = `def inOrder(arg1, arg2):
    # removes win
    return Ite(
        Eq(arg1[0], IntLit(1)),  # if first command is insert
        BoolLit(True),  # second can be insert or remove
        Not(Eq(arg2[0], IntLit(1))),  # but if remove, must be remove next
    )
`;

export const sourceAtom = atom(INITIAL_SOURCE);
