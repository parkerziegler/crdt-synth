import * as React from "react";
import { useAtom } from "jotai";

import { operationsAtom } from "../atoms/operations";
import type { Op } from "../types/operations";

interface Props {
  index: number;
  choice: [Op, Op];
}

const StateOption: React.FC<Props> = ({ index, choice, children }) => {
  const [operations, setOperations] = useAtom(operationsAtom);

  const onClick = React.useCallback(() => {
    operations["1"][index].reconciled = true;
    operations["2"][index].reconciled = true;

    setOperations({ ...operations });
  }, [operations]);

  return (
    <button
      className="text-white text-2xl font-bold w-48 flex justify-center shrink-0 p-6 border border-white transition-colors hover:bg-neon-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StateOption;
