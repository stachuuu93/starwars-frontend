import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  Character,
  CharacterAttributes,
  Starship,
  StarshipAttributes,
} from "../../types";

import PlayCard, { PlayCardProps } from "./PlayCard";

export default {
  title: "PlayCard",
  component: PlayCard,
} as ComponentMeta<typeof PlayCard>;

const Template: ComponentStory<typeof PlayCard> = (args: PlayCardProps) => (
  <PlayCard {...args} />
);

export const CharacterCard = Template.bind({});
CharacterCard.args = {
  type: "character",
  resource: {
    name: "Luke Skywalker",
    height: 172,
    mass: 77,
    iq: 200,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
  } as Character,
  side: "left",
  attributesState: {
    height: "left",
    mass: "right",
    iq: "left",
  },
};

export const StarshipCard = Template.bind({});
StarshipCard.args = {
  type: "starship",
  resource: {
    name: "Death Star",
    length: 120000,
    cargoCapacity: 1000000000000,
    crew: 342953,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f9/Death_star1.png",
  } as Starship,
  side: "right",
  attributesState: {
    length: "left",
    cargoCapacity: "right",
    crew: "left",
  },
};
