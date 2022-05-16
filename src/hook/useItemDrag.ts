import React from "react";

import { useDrag } from "react-dnd";
import { useAppState } from "./AppContext";
import { DragItem } from "./DragItem";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();

  const [{ isDragging }, drag] = useDrag({
    type: item.type, //Contains data about the item we're trying to drag
    //Item replaced Begin in the new version of React DnD
    item: () => {
      return [
        item,
        dispatch({
          type: "SET_DRAGGED_ITEM",
          payload: item,
        }), //Need to return Item + action
      ];
    },

    end: () =>
      dispatch({
        type: "SET_DRAGGED_ITEM",
        payload: undefined,
      }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return { drag };
};
