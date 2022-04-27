import { useAtomValue } from "jotai";

import { operationsAtom } from "../atoms/operations";
import { findNonCommutativeOpIndices } from "../helpers/commutativity";

import OrderingOption from "./OrderingOption";
import OrderingChoice from "./OrderingChoice";
import { Replicas } from "../types/operations";

const displayChoice = (operations: Replicas, index: number) => {
  return (
    operations["1"][index].type !== null &&
    operations["2"][index].type !== null &&
    operations["1"][index].reconciled &&
    operations["2"][index].reconciled &&
    operations["1"][index].type !== operations["2"][index].type
  );
};

const ConflictReporter = () => {
  const operations = useAtomValue(operationsAtom);
  const firstNonCommutativeOpIndex = findNonCommutativeOpIndices(operations)[0];

  return (
    <div className="flex items-center stack relative font-mono">
      <span className="text-white text-3xl font-bold p-6 shrink-0 mr-auto invisible basis-60">
        Conflicts
      </span>
      {operations["1"].map((op, i) => {
        if (i === firstNonCommutativeOpIndex) {
          return (
            <div className="w-48 flex flex-col stack-v items-center justify-center shrink-0">
              <span className="text-neon-caution text-xl">Select Ordering</span>
              <div className="flex stack">
                <OrderingOption index={i} winner="add" />
                <OrderingOption index={i} winner="rmv" />
              </div>
            </div>
          );
        } else if (displayChoice(operations, i)) {
          return <OrderingChoice index={i} key={op.id} />;
        } else {
          return (
            <div className="w-48 flex stack items-center justify-center shrink-0" />
          );
        }
      })}
    </div>
  );
};

export default ConflictReporter;
