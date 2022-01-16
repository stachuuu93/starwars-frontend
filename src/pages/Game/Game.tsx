import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { purple } from "@mui/material/colors";

import PlayCard from "../../components/PlayCard/PlayCard";
import useResource from "../../hooks/useResource";
import { Resource } from "../../types";

const Game = () => {
  const [resource, setResource] = useState<Resource>("starship");
  const { data, error, loading, refetch } = useResource(resource, {
    limit: 2,
  });

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const [leftResource, rightResource] = data!.resources;

  const { imageUrl: leftResourceImage, ...leftResourceAttrs } = leftResource;
  const { imageUrl: rightResourceImage, ...rightResourceAttrs } = rightResource;

  const playAgain = () => {
    refetch();
  };

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item xs={5} md={3} lg={2}>
        <PlayCard
          type="starship"
          attributes={leftResourceAttrs}
          imageUrl={leftResourceImage}
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
        <Select
          value={resource}
          onChange={(event) => setResource(event.target.value as Resource)}
        >
          <MenuItem value="character">Character</MenuItem>
          <MenuItem value="starship">Starship</MenuItem>
        </Select>
        <Button variant="contained" onClick={playAgain}>
          Play again
        </Button>
      </Grid>
      <Grid item xs={5} md={3} lg={2}>
        <PlayCard
          type="starship"
          attributes={rightResourceAttrs}
          imageUrl={rightResourceImage}
        />
      </Grid>
    </Grid>
  );
};

export default Game;
