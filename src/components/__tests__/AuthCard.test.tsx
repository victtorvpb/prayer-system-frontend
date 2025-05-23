import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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
});
