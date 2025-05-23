import { render, screen } from "@testing-library/react";
import ToastNotification from "../ToastNotification";

describe("ToastNotification", () => {
  it("exibe a mensagem e a severidade correta (success)", () => {
    render(
      <ToastNotification
        open={true}
        onClose={() => {}}
        message="Mensagem de teste"
        severity="success"
      />
    );
    // @ts-ignore
    expect(screen.getByText("Mensagem de teste")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardSuccess");
  });

  it("exibe a mensagem com severidade error", () => {
    render(
      <ToastNotification
        open={true}
        onClose={() => {}}
        message="Erro!"
        severity="error"
      />
    );
    // @ts-ignore
    expect(screen.getByText("Erro!")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardError");
  });

  it("não renderiza nada quando open é false", () => {
    render(
      <ToastNotification
        open={false}
        onClose={() => {}}
        message="Mensagem oculta"
        severity="success"
      />
    );
    // @ts-ignore
    expect(screen.queryByText("Mensagem oculta")).not.toBeInTheDocument();
  });
});
