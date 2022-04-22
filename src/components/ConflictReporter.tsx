import { useAtom } from "jotai";
import cs from "classnames";

import { operationsAtom } from "../atoms/operations";
import { findNonCommutativeOpIndices } from "../helpers/commutativity";

const ConflictReporter = () => {
  const [operations, _] = useAtom(operationsAtom);

  const firstNonCommutativeOpIndex = findNonCommutativeOpIndices(operations)[0];

  return (
    <>
      <div className="flex items-center relative">
        <span className="text-neon-white text-2xl absolute -top-8 font-bold">
          Time
        </span>
        <div className="h-2 bg-outline w-full" />
        <svg viewBox="0 0 16 16" width="16" height="16">
          <polygon points="0,0 12,8 0,16" className="fill-outline" />
        </svg>
      </div>
      <div className="flex items-center stack relative font-mono">
        <span className="text-white text-3xl font-bold p-6 shrink-0 mr-auto invisible basis-60">
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
    </>
  );
};

export default ConflictReporter;
