import React from "react";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Grid } from "@mui/material";

import PlayCard from "../../components/PlayCard/PlayCard";

const RANDOM_SHIPS = gql`
  query getRandomShips($limit: Int) {
    pickRandomStarships(limit: $limit) {
      name
      length
      crew
      cargoCapacity
      imageUrl
    }
  }
`;

const Game = () => {
  const { error, loading, data } = useQuery(RANDOM_SHIPS, {
    fetchPolicy: "no-cache",
    variables: { limit: 2 },
  });

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const [leftStarship, rightStarship] = data.pickRandomStarships;

  const { imageUrl: leftStarshipImage, ...leftStarshipAttrs } = leftStarship;
  const { imageUrl: rightStarshipImage, ...rightStarshipAttrs } = rightStarship;

  return (
    <Grid container justifyContent="space-around">
      <Grid item xs={5} md={3} lg={2}>
        <PlayCard
          type="starship"
          attributes={leftStarshipAttrs}
          imageUrl={leftStarshipImage}
        />
      </Grid>
      <Grid item xs={5} md={3} lg={2}>
        <PlayCard
          type="starship"
          attributes={rightStarshipAttrs}
          imageUrl={rightStarshipImage}
        />
      </Grid>
    </Grid>
  );
};

export default Game;
