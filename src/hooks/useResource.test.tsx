import { act, renderHook } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";

import useResource, { RANDOM_CHARACTERS, RANDOM_SHIPS } from "./useResource";

const characters = [
  {
    name: "Luke Skywalker",
    height: 172,
    mass: 77,
    iq: 200,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
  },
  {
    name: "Better Luke Skywalker",
    height: 180,
    mass: 77,
    iq: 250,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
  },
];

const starships = [
  {
    name: "Death Star",
    length: 120000,
    cargoCapacity: 1000000000000,
    crew: 342953,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f9/Death_star1.png",
  },
  {
    name: "Death Star 2",
    length: 10000,
    cargoCapacity: 100,
    crew: 34,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f9/Death_star1.png",
  },
];

const mocks = [
  {
    request: {
      query: RANDOM_CHARACTERS,
      variables: { limit: 2 },
    },
    result: {
      data: characters,
    },
  },
  {
    request: {
      query: RANDOM_SHIPS,
      variables: { limit: 2 },
    },
    result: {
      data: starships,
    },
  },
];

const wrapper: React.FC = ({ children }) => (
  <MockedProvider mocks={mocks}>{children}</MockedProvider>
);

describe("useResource", () => {
  it("should fetch charters", async () => {
    const { result } = renderHook(
      () => useResource("character", { limit: 2 }),
      { wrapper }
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(result.current.data).toEqual(characters);
    expect(result.current.loading).toBe(false);
  });

  it("should fetch starships", async () => {
    const { result } = renderHook(() => useResource("starship", { limit: 2 }), {
      wrapper,
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(result.current.data).toEqual(starships);
    expect(result.current.loading).toBe(false);
  });
});
