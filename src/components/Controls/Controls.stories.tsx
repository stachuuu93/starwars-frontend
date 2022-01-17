import { Grid } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Controls, { ControlsProps } from "./Controls";

export default {
  title: "Controls",
  component: Controls,
} as ComponentMeta<typeof Controls>;

const Template: ComponentStory<typeof Controls> = (args: ControlsProps) => (
  <Grid container>
    <Grid item xs={3}>
      <Controls {...args} />
    </Grid>
  </Grid>
);

export const DefaultControls = Template.bind({});
DefaultControls.args = {
  leftScore: 2,
  rightScore: 3,
  resourceType: "character",
  onPickNewCardsClick: () => {},
  onSelectResourceType: () => {},
  onBattleClick: () => {},
};
