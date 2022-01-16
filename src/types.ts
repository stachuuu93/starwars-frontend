interface CommonAttributes {
  name: string;
  imageUrl: string;
}
export interface CharacterAttributes {
  height: number;
  mass: number;
  iq: number;
}

export interface StarshipAttributes {
  length: number;
  cargoCapacity: number;
  crew: number;
}

export interface Character extends CommonAttributes, CharacterAttributes {}
export interface Starship extends CommonAttributes, StarshipAttributes {}

export type Resource = "character" | "starship";
