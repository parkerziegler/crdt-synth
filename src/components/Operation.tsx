import * as React from "react";
import { useAtom } from "jotai";
import type {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import cs from "classnames";

import type { Op } from "../types/operations";
import { operationsAtom } from "../atoms/operations";

interface Props {
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  operation: Op;
  innerRef: DraggableProvided["innerRef"];
  replicaId: "1" | "2";
}

const ChevronUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const ChevronDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Operation: React.FC<Props> = ({
  draggableProps,
  dragHandleProps,
  operation,
  innerRef,
  replicaId,
}) => {
  const [editing, setEditing] = React.useState(false);
  const [operations, setOperations] = useAtom(operationsAtom);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const onEditOperation = React.useCallback(
    (value: number) => {
      if (value > 9 || value < 0) {
        return;
      }

      const index = operations[replicaId].findIndex(
        (op) => op.id === operation.id
      );

      const nextOpsForReplica = Array.from(operations[replicaId]);
      nextOpsForReplica[index].payload = value;

      const nextOps = {
        ...operations,
        [replicaId]: nextOpsForReplica,
      };

      setOperations(nextOps);
    },
    [operations, operation]
  );

  const setRef = React.useCallback(
    (r) => {
      ref.current = r;

      innerRef(r);
    },
    [innerRef]
  );

  React.useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      // @ts-expect-error – the DOM typings specify ev.target as EventTarget
      // but .contains expects a Node. Node is a paret interface of
      // EventTarget and thus ev.target should be just fine to use
      // in a .contains test.
      if (!ref.current?.contains(ev.target) && editing) {
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing]);

  return (
    <div
      ref={setRef}
      className={cs(
        "flex items-center justify-center shrink-0 relative h-48 w-48 rounded-full font-mono font-bold text-2xl border",
        {
          "bg-neon-light text-neon border-neon": operation.type === "add",
          "bg-neon-negative-light text-neon-negative border-neon-negative":
            operation.type === "rmv",
          invisible: operation.type === null,
        }
      )}
      {...draggableProps}
      {...dragHandleProps}
    >
      {editing ? (
        <span className="flex items-center">
          {operation.type}(
          <input
            type="number"
            className="ml-2 bg-canvas w-8 px-2"
            value={operation.payload}
            onChange={(ev) => onEditOperation(+ev.target.value)}
            onKeyDown={(ev) => {
              if (ev.code === "Enter") {
                setEditing(false);
              }
            }}
          />
          <div className="flex flex-col">
            <button onClick={() => onEditOperation(operation.payload + 1)}>
              {ChevronUp}
            </button>
            <button onClick={() => onEditOperation(operation.payload - 1)}>
              {ChevronDown}
            </button>
          </div>
          )
        </span>
      ) : (
        <span onDoubleClick={() => setEditing(true)}>
          {operation.type}({operation.payload})
        </span>
      )}
    </div>
  );
};

export default Operation;
