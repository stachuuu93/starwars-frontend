import { Box, Button, Grid, MenuItem, Select, styled } from "@mui/material";
import { purple, yellow } from "@mui/material/colors";
import { ResourceType } from "../../types";

interface ControlsProps {
  leftScore: number;
  rightScore: number;
  resourceType: ResourceType;
  onPickNewCardsClick: () => void;
  onSelectResourceType: (resourceType: ResourceType) => void;
  onBattleClick: () => void;
}

const ScoreContainer = styled("div")({
  color: yellow[400],
  fontSize: "3rem",
});

const Controls = ({
  leftScore,
  rightScore,
  resourceType,
  onPickNewCardsClick,
  onSelectResourceType,
  onBattleClick,
}: ControlsProps) => {
  return (
    <Grid
      container
      bgcolor={purple[900]}
      alignItems="center"
      p={2}
      direction="column"
      rowSpacing={2}
    >
      <Grid item xs={12}>
        <ScoreContainer>{`${leftScore} : ${rightScore}`}</ScoreContainer>
      </Grid>
      <Grid item xs={12}>
        <Select
          value={resourceType}
          onChange={(event) =>
            onSelectResourceType(event.target.value as ResourceType)
          }
          fullWidth
        >
          <MenuItem value="character">Character</MenuItem>
          <MenuItem value="starship">Starship</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onPickNewCardsClick}>
          Pick random
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onBattleClick}>
          Battle
        </Button>
      </Grid>
    </Grid>
  );
};

export default Controls;
