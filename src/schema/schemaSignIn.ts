import * as zod from 'zod'

const schemaSignIn = zod.object({
  email: zod
    .string()
    .min(1, 'O campo é obrigatório')
    .email('Digite um email válido'),
  password: zod.string().min(6, 'No mínimo 6 caracteres').max(20),
})

export default schemaSignIn
