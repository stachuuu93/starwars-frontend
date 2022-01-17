import { act, renderHook } from "@testing-library/react-hooks";
import { Resource } from "../types";
import useGameState, { GameState } from "./useGameState";

const initialState: GameState = {
  attributesState: {},
  leftScore: 0,
  rightScore: 0,
  resourceType: "starship",
};

const leftResource: Resource = {
  name: "Luke Skywalker",
  height: 172,
  mass: 77,
  iq: 200,
  imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
};
const rightResource: Resource = {
  name: "Better Luke Skywalker",
  height: 180,
  mass: 77,
  iq: 250,
  imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
};

describe("useGameState", () => {
  it("should allow to reset attributes state", () => {
    const { result } = renderHook(() =>
      useGameState({
        ...initialState,
        attributesState: {
          mass: "left",
          height: "left",
          iq: "draw",
        },
      })
    );
    const [_, dispatch] = result.current;

    act(() => {
      dispatch({ type: "resetAttributes" });
    });

    const [state] = result.current;
    expect(state.attributesState).toEqual({});
  });

  it("should allow to select resource type", () => {
    const { result } = renderHook(() => useGameState(initialState));
    const [_, dispatch] = result.current;

    act(() => {
      dispatch({ type: "changeResourceType", resourceType: "character" });
    });

    const [state] = result.current;
    expect(state.resourceType).toBe("character");
    expect(state.leftScore).toBe(0);
    expect(state.rightScore).toBe(0);
    expect(state.attributesState).toEqual({});
  });

  it("should set attributes state after the battle", () => {
    const { result } = renderHook(() => useGameState(initialState));
    const [_, dispatch] = result.current;

    act(() => {
      dispatch({ type: "battle", leftResource, rightResource });
    });

    const [state] = result.current;
    expect(state.attributesState).toEqual({
      height: "right",
      mass: "draw",
      iq: "right",
    });
  });

  it("should add point to the winning side", () => {
    const { result } = renderHook(() => useGameState(initialState));
    const [_, dispatch] = result.current;

    act(() => {
      dispatch({ type: "battle", leftResource, rightResource });
    });

    const [state] = result.current;
    expect(state.leftScore).toBe(0);
    expect(state.rightScore).toBe(1);
  });

  it("should not add any point in case of score draw", () => {
    const { result } = renderHook(() => useGameState(initialState));
    const [_, dispatch] = result.current;

    act(() => {
      dispatch({ type: "battle", leftResource, rightResource: leftResource });
    });

    const [state] = result.current;
    expect(state.leftScore).toBe(0);
    expect(state.rightScore).toBe(0);
  });
});
