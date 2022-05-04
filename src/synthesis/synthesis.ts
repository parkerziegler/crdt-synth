import { OpTypeInt } from "../types/operations";
import { BoolLit, Eq, Expr, IntLit, Ite, Not, Var } from "./grammar";

function grow(programList: Expr[]) {
  const expansion = [];

  // Unary operators.
  for (const p of programList) {
    if (p instanceof BoolLit || p instanceof Eq) {
      expansion.push(new Not(p));
    }
  }

  // Binary operators.
  for (const p1 of programList) {
    for (const p2 of programList) {
      if (
        (p1 instanceof IntLit || p1 instanceof Var) &&
        (p2 instanceof IntLit || p2 instanceof Var) &&
        p1 !== p2
      ) {
        expansion.push(new Eq(p1, p2));
      }
    }
  }

  // If-then-else.
  for (const p1 of programList) {
    for (const p2 of programList) {
      for (const p3 of programList) {
        if (
          (p1 instanceof Eq || p1 instanceof Not) &&
          (p2 instanceof BoolLit || p2 instanceof Eq || p2 instanceof Not) &&
          (p3 instanceof BoolLit || p3 instanceof Eq || p3 instanceof Not)
        ) {
          expansion.push(new Ite(p1, p2, p3));
        }
      }
    }
  }

  return programList.concat(expansion);
}

function check(program: Expr, inputs: [OpTypeInt, OpTypeInt][]) {
  return inputs.every((input) => {
    const result = program.evaluate(input);

    return (
      result === true &&
      program.show().includes("arg1") &&
      program.show().includes("arg2")
    );
  });
}

export function synthesize(inputs: [OpTypeInt, OpTypeInt][]) {
  // Begin with the list of all terminals in the grammar.
  let programList: Expr[] = [
    new BoolLit(true),
    new BoolLit(false),
    new IntLit(0),
    new IntLit(1),
    new Var("arg1[0]"),
    new Var("arg2[0]"),
  ];

  const satisfyingPrograms = [];

  // Arbitrarily limit the output.
  for (let i = 0; i <= 1; i++) {
    programList = grow(programList);

    for (const program of programList) {
      if (satisfyingPrograms.length >= 5) {
        break;
      }

      console.log("Program: ", program.show());
      const result = check(program, inputs);

      if (result) {
        satisfyingPrograms.push(program);
      }
    }
  }

  return satisfyingPrograms;
}
