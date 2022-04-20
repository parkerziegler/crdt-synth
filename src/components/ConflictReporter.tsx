import { useAtom } from "jotai";
import cs from "classnames";

import { operationsAtom } from "../atoms/operations";
import { findNonCommutativeOpIndices } from "../helpers/commutativity";

const ConflictReporter = () => {
  const [operations, _] = useAtom(operationsAtom);

  const firstNonCommutativeOpIndex = findNonCommutativeOpIndices(operations)[0];

  return (
    <div className="flex items-center stack relative font-mono">
      <div className="flex items-center justify-between absolute h-2 w-full bg-outline -top-8 triangle">
        <span className="text-outline text-2xl relative -top-8 font-bold">
          Time
        </span>
      </div>
      <span className="text-white text-3xl font-bold p-6 shrink-0 mr-auto invisible">
        Conflicts
      </span>
      {operations["1"].map((_, i) => (
        <div
          className={cs("w-48 flex items-center justify-center shrink-0", {
            invisible: i !== firstNonCommutativeOpIndex,
          })}
        >
          <span className="w-8 h-8 rounded-full bg-neon-caution-light border border-neon-caution mr-4 shrink-0" />
          <span className="text-neon-caution text-xl">
            Multiple States Possible
          </span>
        </div>
      ))}
    </div>
  );
};

export default ConflictReporter;
