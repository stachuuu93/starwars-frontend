import { useReducer } from "react";
import produce from "immer";

import { AttributesState, Resource, ResourceType } from "../types";

export interface GameState {
  attributesState: AttributesState;
  leftScore: number;
  rightScore: number;
  resourceType: ResourceType;
}

type Action =
  | {
      type: "battle";
      leftResource: Resource;
      rightResource: Resource;
    }
  | { type: "changeResourceType"; resourceType: ResourceType }
  | { type: "resetAttributes" };

const COMMON_ATTRIBUTES = ["name", "imageUrl"];

const filterOutCommonAttributes = (resource: Resource) => {
  return Object.fromEntries(
    Object.entries(resource).filter(([key]) => !COMMON_ATTRIBUTES.includes(key))
  );
};

const useGameState = (initialState: GameState) => {
  return useReducer((state: GameState, action: Action): GameState => {
    switch (action.type) {
      case "battle":
        return produce(state, (draft) => {
          const leftAttributes = filterOutCommonAttributes(action.leftResource);
          const rightAttributes = filterOutCommonAttributes(
            action.rightResource
          );
          draft.attributesState = Object.fromEntries(
            Object.keys(leftAttributes).map((key) => [
              key,
              leftAttributes[key] > rightAttributes[key] ? "left" : "right",
            ])
          );

          const leftPoints = Object.values(draft.attributesState).filter(
            (value) => value === "left"
          ).length;
          const rightPoints = Object.values(draft.attributesState).filter(
            (value) => value === "right"
          ).length;

          if (leftPoints > rightPoints) {
            draft.leftScore += 1;
          } else {
            draft.rightScore += 1;
          }
        });
      case "changeResourceType":
        return produce(state, (draft) => {
          draft.resourceType = action.resourceType;
          draft.leftScore = 0;
          draft.rightScore = 0;
        });
      case "resetAttributes":
        return produce(state, (draft) => {
          draft.attributesState = {};
        });
      default:
        return state;
    }
  }, initialState);
};

export default useGameState;
