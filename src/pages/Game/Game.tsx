import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, CircularProgress, Grid } from "@mui/material";

import PlayCard from "../../components/PlayCard/PlayCard";
import { purple } from "@mui/material/colors";

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
  const { error, loading, data, refetch } = useQuery(RANDOM_SHIPS, {
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

  const playAgain = () => {
    refetch();
  };

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item xs={5} md={3} lg={2}>
        <PlayCard
          type="starship"
          attributes={leftStarshipAttrs}
          imageUrl={leftStarshipImage}
        />
      </Grid>
      <Grid
        item
        container
        xs={1}
        md={2}
        bgcolor={purple[900]}
        justifyContent="center"
        p={2}
      >
        <Button variant="contained" onClick={playAgain}>
          Play again
        </Button>
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
