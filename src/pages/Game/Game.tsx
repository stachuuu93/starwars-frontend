import {
  Button,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { purple } from "@mui/material/colors";

import PlayCard from "../../components/PlayCard/PlayCard";
import useResource from "../../hooks/useResource";
import useGameState, { GameState } from "../../hooks/useGameState";
import { ResourceType } from "../../types";

const initialState: GameState = {
  attributesState: {},
  leftScore: 0,
  rightScore: 0,
  resourceType: "starship",
};

const Game = () => {
  const [gameState, dispatch] = useGameState(initialState);
  const { data, error, loading, refetch } = useResource(
    gameState.resourceType,
    {
      limit: 2,
    }
  );

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const [leftResource, rightResource] = data!.resources;

  const handlePlayAgainClick = () => {
    refetch();
    dispatch({ type: "resetAttributes" });
  };

  const handleBattleClick = () => {
    dispatch({ type: "battle", leftResource, rightResource });
  };

  const handleSelectResourceType = (event: SelectChangeEvent) => {
    dispatch({
      type: "changeResourceType",
      resourceType: event.target.value as ResourceType,
    });
  };

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item xs={5} md={3} lg={2}>
        <PlayCard
          type={gameState.resourceType}
          side="left"
          resource={leftResource}
          attributesState={gameState.attributesState}
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
        <Box display="block">{`${gameState.leftScore} : ${gameState.rightScore}`}</Box>
        <Select
          value={gameState.resourceType}
          onChange={handleSelectResourceType}
        >
          <MenuItem value="character">Character</MenuItem>
          <MenuItem value="starship">Starship</MenuItem>
        </Select>
        <Button variant="contained" onClick={handlePlayAgainClick}>
          Pick random
        </Button>
        <Button variant="contained" onClick={handleBattleClick}>
          Battle
        </Button>
      </Grid>
      <Grid item xs={5} md={3} lg={2}>
        <PlayCard
          type={gameState.resourceType}
          side="right"
          resource={rightResource}
          attributesState={gameState.attributesState}
        />
      </Grid>
    </Grid>
  );
};

export default Game;
