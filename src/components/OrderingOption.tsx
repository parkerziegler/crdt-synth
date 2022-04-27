import * as React from "react";
import { useAtom } from "jotai";

import { operationsAtom } from "../atoms/operations";

interface Props {
  winner: "add" | "rmv";
  index: number;
}

const OrderingOption: React.FC<Props> = ({ winner, index }) => {
  const [operations, setOperations] = useAtom(operationsAtom);

  const onClick = React.useCallback(() => {
    // When a user selects a "winner", they are choosing an operation type
    // to be processed last. Therefore, we set an operation's first property
    // based on whether or not it is equivalent to the winner.
    const opPair = [operations["1"][index], operations["2"][index]];

    opPair.forEach((op) => {
      op.first = op.type !== winner;
      op.reconciled = true;
    });

    setOperations({ ...operations });
  }, [winner, operations]);

  return (
    <button
      className="flex border border-white p-2 hover:bg-neon-white"
      onClick={onClick}
    >
      {winner === "add" ? (
        <>
          <span className="w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative mr-4 shrink-0" />
          <span className="w-6 h-6 rounded-full bg-neon-light border border-neon shrink-0" />
        </>
      ) : (
        <>
          <span className="w-6 h-6 rounded-full bg-neon-light border border-neon mr-4 shrink-0" />
          <span className="w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative shrink-0" />
        </>
      )}
    </button>
  );
};

export default OrderingOption;
