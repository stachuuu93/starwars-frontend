import React from "react";
import { render } from "@testing-library/react";
import { startCase } from "lodash";

import { AttributesState, Resource } from "../../types";
import PlayCard from "./PlayCard";
import { green, red } from "@mui/material/colors";

describe("<PlayCard />", () => {
  const resource: Resource = {
    name: "Luke Skywalker",
    height: 172,
    mass: 77,
    iq: 200,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
  };
  const attributesState: AttributesState = {
    height: "draw",
    mass: "left",
    iq: "right",
  };

  it("should display name and resource type", () => {
    const resourceType = "character";
    const { getByText } = render(
      <PlayCard
        side="left"
        resource={resource}
        type={resourceType}
        attributesState={attributesState}
      />
    );

    expect(getByText(resource.name)).toBeInTheDocument();
    expect(getByText(startCase(resourceType))).toBeInTheDocument();
  });

  it("should display resource specified attributes", () => {
    const { getByText } = render(
      <PlayCard
        side="left"
        resource={resource}
        type="character"
        attributesState={attributesState}
      />
    );

    expect(getByText("Height:")).toBeInTheDocument();
    expect(getByText("Mass:")).toBeInTheDocument();
    expect(getByText("Iq:")).toBeInTheDocument();
  });

  it("should render resource specified attribute values based on game state", () => {
    const { name, imageUrl, ...rest } = resource;
    const { getByText } = render(
      <PlayCard
        side="left"
        resource={resource}
        type="character"
        attributesState={attributesState}
      />
    );

    expect(getByText(resource.height)).toHaveStyle({
      color: "inherit",
    });
    expect(getByText(resource.mass)).toHaveStyle({
      color: green[700],
    });
    expect(getByText(resource.iq)).toHaveStyle({
      color: red[700],
    });
  });
});
