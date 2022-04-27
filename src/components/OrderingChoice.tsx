import { useAtomValue } from "jotai";

import { operationsAtom } from "../atoms/operations";

interface Props {
  index: number;
}

const OrderingChoice: React.FC<Props> = ({ index }) => {
  const operations = useAtomValue(operationsAtom);
  const winner = operations["1"][index].first
    ? operations["2"][index].type
    : operations["1"][index].type;

  return (
    <div className="w-48 flex flex-col stack-v items-center justify-center shrink-0">
      {winner === "add" ? (
        <>
          <div className="flex stack">
            <span className="w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative shrink-0" />
            <span className="w-6 h-6 rounded-full bg-neon-light border border-neon shrink-0" />
          </div>
          <span className="text-neon text-xl">Add Wins</span>
        </>
      ) : (
        <>
          <div className="flex stack">
            <span className="w-6 h-6 rounded-full bg-neon-light border border-neon shrink-0" />
            <span className="w-6 h-6 rounded-full bg-neon-negative-light border border-neon-negative shrink-0" />
          </div>
          <span className="text-neon-negative text-xl">Remove Wins</span>
        </>
      )}
    </div>
  );
};

export default OrderingChoice;
