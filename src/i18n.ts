import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pt: {
    translation: {
      login: {
        title: "Login",
        email: "E-mail",
        password: "Senha",
        forgot: "Esqueci minha senha",
        submit: "Entrar",
        noAccount: "Não tem uma conta?",
        create: "Criar conta",
        required: "Campo obrigatório",
        invalidEmail: "E-mail inválido",
        minPassword: "Mínimo 6 caracteres"
      },
      register: {
        title: "Criar conta",
        name: "Nome",
        email: "E-mail",
        password: "Senha",
        confirm: "Confirmar senha",
        submit: "Cadastrar",
        already: "Já tem uma conta?",
        back: "Voltar ao login",
        required: "Campo obrigatório",
        invalidEmail: "E-mail inválido",
        minPassword: "Mínimo 6 caracteres",
        notMatch: "As senhas não coincidem"
      },
      forgot: {
        title: "Esqueci minha senha",
        info: "Informe seu e-mail para receber instruções de redefinição de senha.",
        email: "E-mail",
        submit: "Enviar instruções",
        back: "Voltar ao login",
        required: "Campo obrigatório",
        invalidEmail: "E-mail inválido"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false
  }
});

export default i18n; 
