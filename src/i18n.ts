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
        minPassword: "Mínimo 6 caracteres",
        mockSuccess: "Login realizado com sucesso!",
        mockError: "E-mail ou senha inválidos."
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
        notMatch: "As senhas não coincidem",
        mockSuccess: "Cadastro realizado! Você já pode fazer login."
      },
      forgot: {
        title: "Esqueci minha senha",
        info: "Informe seu e-mail para receber instruções de redefinição de senha.",
        email: "E-mail",
        submit: "Enviar instruções",
        back: "Voltar ao login",
        required: "Campo obrigatório",
        invalidEmail: "E-mail inválido",
        mockSuccess: "Se o e-mail existir, você receberá as instruções em instantes."
      }
    }
  },
  en: {
    translation: {
      login: {
        title: "Login",
        email: "Email",
        password: "Password",
        forgot: "Forgot password",
        submit: "Sign in",
        noAccount: "Don't have an account?",
        create: "Create account",
        required: "Required field",
        invalidEmail: "Invalid email",
        minPassword: "At least 6 characters",
        mockSuccess: "Login successful!",
        mockError: "Invalid email or password."
      },
      register: {
        title: "Create account",
        name: "Name",
        email: "Email",
        password: "Password",
        confirm: "Confirm password",
        submit: "Register",
        already: "Already have an account?",
        back: "Back to login",
        required: "Required field",
        invalidEmail: "Invalid email",
        minPassword: "At least 6 characters",
        notMatch: "Passwords do not match",
        mockSuccess: "Registration successful! You can now log in."
      },
      forgot: {
        title: "Forgot password",
        info: "Enter your email to receive password reset instructions.",
        email: "Email",
        submit: "Send instructions",
        back: "Back to login",
        required: "Required field",
        invalidEmail: "Invalid email",
        mockSuccess: "If the email exists, you will receive instructions soon."
      }
    }
  },
  es: {
    translation: {
      login: {
        title: "Iniciar sesión",
        email: "Correo electrónico",
        password: "Contraseña",
        forgot: "¿Olvidaste tu contraseña?",
        submit: "Entrar",
        noAccount: "¿No tienes una cuenta?",
        create: "Crear cuenta",
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        minPassword: "Mínimo 6 caracteres",
        mockSuccess: "¡Inicio de sesión exitoso!",
        mockError: "Correo o contraseña inválidos."
      },
      register: {
        title: "Crear cuenta",
        name: "Nombre",
        email: "Correo electrónico",
        password: "Contraseña",
        confirm: "Confirmar contraseña",
        submit: "Registrarse",
        already: "¿Ya tienes una cuenta?",
        back: "Volver al inicio de sesión",
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        minPassword: "Mínimo 6 caracteres",
        notMatch: "Las contraseñas no coinciden",
        mockSuccess: "¡Registro exitoso! Ya puedes iniciar sesión."
      },
      forgot: {
        title: "Olvidé mi contraseña",
        info: "Ingresa tu correo para recibir instrucciones de restablecimiento.",
        email: "Correo electrónico",
        submit: "Enviar instrucciones",
        back: "Volver al inicio de sesión",
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        mockSuccess: "Si el correo existe, recibirás las instrucciones pronto."
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
