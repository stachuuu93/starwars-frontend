import { fireEvent, render } from "@testing-library/react";

import Controls from "./Controls";

describe("<Controls />", () => {
  it("should display game score", () => {
    const leftScore = 12;
    const rightScore = 2;
    const { getByText } = render(
      <Controls
        leftScore={leftScore}
        rightScore={rightScore}
        resourceType="character"
        onPickNewCardsClick={() => {}}
        onBattleClick={() => {}}
        onSelectResourceType={() => {}}
      />
    );

    expect(getByText(`${leftScore} : ${rightScore}`)).toBeInTheDocument();
  });

  it("should be possible to select resource type", () => {
    const handleSelectResourceType = jest.fn();
    const { getByText } = render(
      <Controls
        leftScore={1}
        rightScore={1}
        resourceType="character"
        onPickNewCardsClick={() => {}}
        onBattleClick={() => {}}
        onSelectResourceType={handleSelectResourceType}
      />
    );

    fireEvent.mouseDown(getByText("Character"));
    fireEvent.click(getByText("Starship"));

    expect(handleSelectResourceType).toBeCalledWith("starship");
  });

  it("should be possible to pick new cards", () => {
    const handlePickNewCards = jest.fn();
    const { getByText } = render(
      <Controls
        leftScore={1}
        rightScore={1}
        resourceType="character"
        onPickNewCardsClick={handlePickNewCards}
        onBattleClick={() => {}}
        onSelectResourceType={() => {}}
      />
    );

    fireEvent.click(getByText("Pick random"));

    expect(handlePickNewCards).toBeCalled();
  });

  it("should be possible to start the battle", () => {
    const handleBattle = jest.fn();
    const { getByText } = render(
      <Controls
        leftScore={1}
        rightScore={1}
        resourceType="character"
        onPickNewCardsClick={() => {}}
        onBattleClick={handleBattle}
        onSelectResourceType={() => {}}
      />
    );

    fireEvent.click(getByText("Battle"));

    expect(handleBattle).toBeCalled();
  });
});
