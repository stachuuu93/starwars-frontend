import { CircularProgress, Grid } from "@mui/material";

import PlayCard from "../../components/PlayCard/PlayCard";
import Controls from "../../components/Controls/Controls";
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

  const handleSelectResourceType = (resourceType: ResourceType) => {
    dispatch({
      type: "changeResourceType",
      resourceType,
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
      <Grid item xs={1} md={2}>
        <Controls
          leftScore={gameState.leftScore}
          rightScore={gameState.rightScore}
          resourceType={gameState.resourceType}
          onBattleClick={handleBattleClick}
          onPickNewCardsClick={handlePlayAgainClick}
          onSelectResourceType={handleSelectResourceType}
        />
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
