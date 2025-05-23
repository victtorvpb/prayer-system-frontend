import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import Navbar from "../Navbar";

jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    logout: jest.fn(),
    isAuthenticated: true,
  }),
}));

describe("Navbar", () => {
  it("renderiza o título do app", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </I18nextProvider>
    );
    expect(screen.getByText(/oração|prayer|reze/i)).toBeInTheDocument();
  });

  it("abre e fecha o menu de perfil ao clicar no avatar", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </I18nextProvider>
    );
    const avatar = screen.getAllByRole("button")[1];
    fireEvent.click(avatar);
    expect(screen.getByText(/profile|perfil/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/profile|perfil/i));
    expect(screen.queryByText(/profile|perfil/i)).not.toBeVisible;
  });
});
