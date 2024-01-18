import * as zod from 'zod'

const schemaSignUp = zod.object({
  email: zod
    .string()
    .min(1, 'O campo é obrigatório')
    .email('Digite um email válido'),
  password: zod.string().min(6, 'No mínimo 6 caracteres').max(20),
  name: zod.string().min(1, 'O campo é obrigatório'),
})

export default schemaSignUp
