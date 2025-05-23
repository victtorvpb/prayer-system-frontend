import * as yup from 'yup';

const messages = {
  category: {
    required: 'Categoria é obrigatória',
  },
  prayerPoint: {
    required: 'Pauta de oração é obrigatória',
    maxLength: 'A pauta de oração deve ter no máximo 300 caracteres',
  },
  biblicalBase: {
    required: 'Base bíblica é obrigatória',
  },
  name: {
    required: 'Nome é obrigatório',
  },
  email: {
    required: 'Email é obrigatório',
    invalid: 'Email inválido',
  },
  password: {
    required: 'Senha é obrigatória',
    minLength: 'A senha deve ter no mínimo 6 caracteres',
  },
  confirmPassword: {
    required: 'Confirmação de senha é obrigatória',
    mustMatch: 'As senhas não conferem',
  },
  role: {
    required: 'Perfil é obrigatório',
  },
};

export const createPrayerPointSchema = yup.object().shape({
  category: yup.string().required(messages.category.required),
  prayerPoint: yup
    .string()
    .required(messages.prayerPoint.required)
    .max(300, messages.prayerPoint.maxLength),
  biblicalBase: yup.string().required(messages.biblicalBase.required),
  active: yup.boolean().required(),
});

export const createUserSchema = yup.object().shape({
  nome: yup.string().required(messages.name.required),
  email: yup
    .string()
    .email(messages.email.invalid)
    .required(messages.email.required),
  senha: yup
    .string()
    .required(messages.password.required)
    .min(6, messages.password.minLength),
  confirmarSenha: yup
    .string()
    .required(messages.confirmPassword.required)
    .oneOf([yup.ref('senha')], messages.confirmPassword.mustMatch),
  role: yup
    .mixed<'admin' | 'user'>()
    .oneOf(['admin', 'user'])
    .required(messages.role.required),
  ativo: yup.boolean().required(),
});

export const editUserSchema = yup.object().shape({
  nome: yup.string().required(messages.name.required),
  email: yup
    .string()
    .email(messages.email.invalid)
    .required(messages.email.required),
  role: yup
    .mixed<'admin' | 'user'>()
    .oneOf(['admin', 'user'])
    .required(messages.role.required),
  ativo: yup.boolean().required(),
}); 
