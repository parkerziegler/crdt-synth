type Expr = any;

export function Ite(guard: Expr, ifBody: Expr, elseBody: Expr) {
  return {
    tag: "Ite",
    guard,
    ifBody,
    elseBody,
  };
}

function Eq(left: Expr, right: Expr) {
  return {
    tag: "Eq",
    left,
    right,
  };
}

function Not(expr: Expr) {
  return {
    tag: "Not",
    expr,
  };
}

function IntLit(int: number) {
  return {
    tag: "IntLit",
    int,
  };
}

function BoolLit(bool: boolean) {
  return {
    tag: "BoolLit",
    bool,
  };
}

function evaluate(p, input) {
  switch (p.tag) {
    case "IntLit":
      return p.int;
    case "BoolLit":
      return p.bool;
    case "Eq":
      return evaluate(p.left, input) === evaluate(p.right, input);
    case "Ite":
      if (evaluate(p.guard, input)) {
        return evaluate(p.ifBody, input);
      } else {
        return evaluate(p.elseBody, input);
      }
  }
}

function grow(plist) {
  const expansion = [];

  for (const p of plist) {
    expansion.push(Not(p));
  }

  for (const p1 of plist) {
    for (const p2 of plist) {
      expansion.push(Eq(p1, p2));
    }
  }

  for (const p1 of plist) {
    for (const p2 of plist) {
      for (const p3 of plist) {
        expansion.push(Ite(p1, p2, p3));
      }
    }
  }

  return plist.concat(expansion);
}

export function synthesize() {
  let plist = [BoolLit(true), BoolLit(false), IntLit(0), IntLit(1)];

  for (let i = 0; i < 2; i++) {
    plist = grow(plist);
  }

  console.log(plist);
}
