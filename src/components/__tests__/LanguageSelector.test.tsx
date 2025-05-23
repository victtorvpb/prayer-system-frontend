import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "../LanguageSelector";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

describe("LanguageSelector", () => {
  it("renderiza o seletor de idiomas", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("troca o idioma ao selecionar uma opção", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );
    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);
    const option = screen.getByRole("option", { name: /english/i });
    fireEvent.click(option);
    expect(i18n.language).toBe("en");
  });
});
