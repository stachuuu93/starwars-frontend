import { Button, Grid, MenuItem, Select, styled } from "@mui/material";
import { purple, yellow } from "@mui/material/colors";
import { ResourceType } from "../../types";

export interface ControlsProps {
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
  display: "flex",
  justifyContent: "center",
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
      bgcolor={purple[800]}
      alignItems="stretch"
      p={2}
      direction="column"
      rowSpacing={2}
    >
      <Grid item xs={12}>
        <ScoreContainer>{`${leftScore} : ${rightScore}`}</ScoreContainer>
      </Grid>
      <Grid item xs={12}>
        <Select
          color="secondary"
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
        <Button
          color="secondary"
          variant="contained"
          onClick={onPickNewCardsClick}
          fullWidth
        >
          Pick random
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="contained"
          onClick={onBattleClick}
          fullWidth
        >
          Battle
        </Button>
      </Grid>
    </Grid>
  );
};

export default Controls;
