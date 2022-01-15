export interface CharacterAttributes {
  name: string;
  height: number;
  mass: number;
  gender: "male" | "female";
}

export interface StarshipAttributes {
  name: string;
  length: number;
  cargoCapacity: number;
  crew: number;
}
