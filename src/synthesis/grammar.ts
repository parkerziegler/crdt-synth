import { OpTypeInt } from "../types/operations";

export class BoolLit {
  bool: boolean;
  tag = "BoolLit";

  constructor(bool: boolean) {
    this.bool = bool;
  }

  #jsBoolToPy() {
    return (
      this.bool.toString().charAt(0).toUpperCase() +
      this.bool.toString().slice(1)
    );
  }

  show() {
    return `BoolLit(${this.#jsBoolToPy()})`;
  }

  format() {
    return `def inOrder(arg1, arg2):
  ${this.show()}
  `;
  }

  evaluate(input: [OpTypeInt, OpTypeInt]) {
    return this.bool;
  }
}

export class IntLit {
  int: number;
  tag = "IntLit";

  constructor(int: number) {
    this.int = int;
  }

  show() {
    return `IntLit(${this.int})`;
  }

  format() {
    return `def inOrder(arg1, arg2):
  ${this.show()}
  `;
  }

  evaluate(input: [OpTypeInt, OpTypeInt]) {
    return this.int;
  }
}

export class Var {
  name: "arg1[0]" | "arg2[0]";
  tag = "Var";

  constructor(name: "arg1[0]" | "arg2[0]") {
    this.name = name;
  }

  show() {
    return this.name;
  }

  format() {
    return `def inOrder(arg1, arg2):
  ${this.show()}
  `;
  }

  evaluate(input: [OpTypeInt, OpTypeInt]) {
    return this.name === "arg1[0]" ? input[0] : input[1];
  }
}

export class Eq {
  left: Var | IntLit;
  right: Var | IntLit;
  tag = "Eq";

  constructor(left: Var | IntLit, right: Var | IntLit) {
    this.left = left;
    this.right = right;
  }

  show() {
    return `Eq(${this.left.show()}, ${this.right.show()})`;
  }

  format() {
    return `def inOrder(arg1, arg2):
  ${this.show()}
  `;
  }

  evaluate(input: [OpTypeInt, OpTypeInt]) {
    return this.left.evaluate(input) === this.right.evaluate(input);
  }
}

export class Not {
  expr: BoolLit | Eq;
  tag = "Not";

  constructor(expr: BoolLit | Eq) {
    this.expr = expr;
  }

  show() {
    return `Not(${this.expr.show()})`;
  }

  format() {
    return `def inOrder(arg1, arg2):
  ${this.show()}
  `;
  }

  evaluate(input: [OpTypeInt, OpTypeInt]) {
    return !this.expr.evaluate(input);
  }
}

export class Ite {
  guard: Eq | Not;
  ifBody: BoolLit | Eq | Not;
  elseBody: BoolLit | Eq | Not;

  constructor(
    guard: Eq | Not,
    ifBody: BoolLit | Eq | Not,
    elseBody: BoolLit | Eq | Not
  ) {
    this.guard = guard;
    this.ifBody = ifBody;
    this.elseBody = elseBody;
  }

  show() {
    return `Ite(
    ${this.guard.show()},
    ${this.ifBody.show()},
    ${this.elseBody.show()}
  )`;
  }

  format() {
    return `def inOrder(arg1, arg2):
  ${this.show()}
  `;
  }

  evaluate(input: [OpTypeInt, OpTypeInt]) {
    return this.guard.evaluate(input)
      ? this.ifBody.evaluate(input)
      : this.elseBody.evaluate(input);
  }
}

export type Expr = BoolLit | IntLit | Var | Eq | Not | Ite;
