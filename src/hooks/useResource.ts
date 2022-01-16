import { gql, useQuery } from "@apollo/client";

import { Character, Resource, Starship } from "../types";

interface UseResourceOptions {
  limit: number;
}

interface ResourceResponse {
  resources: Character[] | Starship[];
}

const RANDOM_SHIPS = gql`
  query getRandomShips($limit: Int) {
    resources: pickRandomStarships(limit: $limit) {
      name
      length
      crew
      cargoCapacity
      imageUrl
    }
  }
`;

const RANDOM_CHARACTERS = gql`
  query getCharactersShips($limit: Int) {
    resources: pickRandomCharacters(limit: $limit) {
      name
      height
      mass
      gender
      imageUrl
    }
  }
`;

const useResource = (resource: Resource, options: UseResourceOptions) => {
  const { limit } = options;

  return useQuery<ResourceResponse>(
    resource === "character" ? RANDOM_CHARACTERS : RANDOM_SHIPS,
    {
      fetchPolicy: "no-cache",
      variables: { limit },
    }
  );
};

export default useResource;
