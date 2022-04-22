import * as React from "react";
import { useAtom } from "jotai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { operationsAtom } from "../atoms/operations";
import type { Op, ReplicaId } from "../types/operations";

import Operation from "./Operation";

const reorder = (list: Op[], startIndex: number, endIndex: number): Op[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface Props {
  replicaId: ReplicaId;
}

const Replica: React.FC<Props> = ({ replicaId }) => {
  const [operations, setOperations] = useAtom(operationsAtom);

  const onDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const nextOpsForReplica = reorder(
        operations[replicaId],
        result.source.index,
        result.destination.index
      );
      const nextOps = {
        ...operations,
        [replicaId]: nextOpsForReplica,
      };

      setOperations(nextOps);
    },
    [operations]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="replica" direction="horizontal">
        {(provided) => {
          return (
            <div className="flex items-center stack">
              <span className="text-white text-3xl font-bold font-mono p-6 shrink-0 basis-60">
                Replica {replicaId}
              </span>
              <div
                ref={provided.innerRef}
                className="flex stack"
                {...provided.droppableProps}
              >
                {operations[replicaId].map((operation, i) => (
                  <Draggable
                    key={operation.id}
                    draggableId={operation.id}
                    index={i}
                  >
                    {(provided) => (
                      <Operation
                        innerRef={provided.innerRef}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        operation={operation}
                        replicaId={replicaId}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Replica;
