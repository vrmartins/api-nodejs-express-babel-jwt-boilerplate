import sendEmail from '../utils/sendEmail'

const sendWelcomeEmail = ({ email, firstName }) => {
  const message = `Olá ${firstName}! Clique no link abaixo para confirmar seu cadastro`
  return sendEmail({
    from: 'webappsb@webappsb.com.br',
    to: email,
    subject: 'Bem-Vindo ao WebAppSB',
    text: message,
    html: `<b>${message}</b>`
  })
}

export default sendWelcomeEmail
