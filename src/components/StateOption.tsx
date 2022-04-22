import * as React from "react";
import { useAtom } from "jotai";

import { operationsAtom, orderedOperationsAtom } from "../atoms/operations";

interface Props {
  index: number;
  swap: boolean;
}

const StateOption: React.FC<Props> = ({ index, swap, children }) => {
  const [operations, setOperations] = useAtom(operationsAtom);
  const [orderedOperations, setOrderedOperations] = useAtom(
    orderedOperationsAtom
  );

  const onClick = React.useCallback(() => {
    operations["1"][index].reconciled = true;
    operations["2"][index].reconciled = true;

    // If the user chooses the latter of the two state options,
    // swap the operations in orderedOperations.
    if (swap) {
      const nextOrder = [...orderedOperations];

      [nextOrder[index][0], nextOrder[index][1]] = [
        nextOrder[index][1],
        nextOrder[index][0],
      ];

      setOrderedOperations(nextOrder);
    }

    setOperations({ ...operations });
  }, [operations, swap, orderedOperations]);

  return (
    <button
      className="text-white text-2xl font-bold w-48 flex justify-center shrink-0 p-2 border border-white transition-colors hover:bg-neon-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StateOption;
