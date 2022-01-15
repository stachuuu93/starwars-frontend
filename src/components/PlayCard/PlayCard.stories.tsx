import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharacterAttributes, StarshipAttributes } from "../../types";

import PlayCard, { PlayCardProps } from "./PlayCard";

export default {
  title: "PlayCard",
  component: PlayCard,
} as ComponentMeta<typeof PlayCard>;

const Template: ComponentStory<typeof PlayCard> = (args: PlayCardProps) => (
  <PlayCard {...args} />
);

export const Character = Template.bind({});
Character.args = {
  type: "character",
  attributes: {
    name: "Luke Skywalker",
    height: 172,
    mass: 77,
    gender: "male",
  } as CharacterAttributes,
  imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
};

export const Starship = Template.bind({});
Starship.args = {
  type: "starship",
  attributes: {
    name: "Death Star",
    length: 120000,
    cargoCapacity: 1000000000000,
    crew: 342953,
  } as StarshipAttributes,
  imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f9/Death_star1.png",
};
