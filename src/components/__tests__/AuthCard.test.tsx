import { render, screen } from "@testing-library/react";
import { AuthCard } from "../AuthCard";

describe("AuthCard", () => {
  it("renderiza o conteúdo passado como children", () => {
    render(
      <AuthCard>
        <div>Conteúdo de teste</div>
      </AuthCard>
    );
    expect(screen.getByText("Conteúdo de teste")).toBeInTheDocument();
  });

  it("bate o snapshot do AuthCard", () => {
    const { asFragment } = render(
      <AuthCard>
        <div>Snapshot test</div>
      </AuthCard>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
