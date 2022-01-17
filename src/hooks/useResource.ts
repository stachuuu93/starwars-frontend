import { gql, useQuery } from "@apollo/client";

import { Character, Resource, ResourceType, Starship } from "../types";

interface UseResourceOptions {
  limit: number;
}

interface ResourceResponse {
  resources: Resource[];
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
      iq
      imageUrl
    }
  }
`;

const useResource = (resource: ResourceType, options: UseResourceOptions) => {
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
