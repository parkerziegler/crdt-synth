import { useAtomValue } from "jotai";

import { operationsAtom } from "../atoms/operations";
import { computeReplicaStateAtStep } from "../helpers/execution";

function formatSet<T>(set: Set<T>) {
  const arr = Array.from(set);

  if (arr.length === 0) {
    return "{}";
  }

  return (
    "{" +
    arr.slice(1).reduce((acc, el) => acc.concat(`, ${el}`), `${arr[0]}`) +
    "}"
  );
}

function checkSetsEq<T>(left: Set<T>, right: Set<T>) {
  return (
    left.size === right.size && Array.from(left).every((v) => right.has(v))
  );
}

const StateTracker = () => {
  const operations = useAtomValue(operationsAtom);

  const states = new Array(operations["1"].length)
    .fill(undefined)
    .map((_, i) => computeReplicaStateAtStep(operations, i));

  return (
    <div className="flex items-top stack">
      <span
        className="text-white text-3xl font-bold font-mono p-6 shrink-0 basis-60"
        style={{ marginRight: "auto" }}
      >
        State
      </span>
      {states.map((stateAtStep, i) => {
        if (stateAtStep === null) {
          return (
            <span
              key={i}
              className="text-white text-2xl font-bold w-48 flex justify-center shrink-0 p-6"
            />
          );
        }

        const [state1, state2] = stateAtStep;

        return (
          <span
            key={i}
            className="text-white text-2xl font-bold w-48 flex justify-center shrink-0 py-6"
          >
            {checkSetsEq(state1, state2)
              ? formatSet(state1)
              : `${formatSet(state1)} or ${formatSet(state2)}`}
          </span>
        );
      })}
    </div>
  );
};

export default StateTracker;
