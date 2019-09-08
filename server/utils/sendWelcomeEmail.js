import sendEmail from '../utils/sendEmail'

// TODO: Elaborar uma mensagem de confirmação de cadastro
const sendWelcomeEmail = ({ email, firstName, confirmationCode }) => {
  const message = `Olá ${firstName}! Clique no link abaixo para confirmar seu cadastro`
  return sendEmail({
    from: 'webappsb@webappsb.com.br',
    to: email,
    subject: 'Bem-Vindo ao WebAppSB',
    text: `${message}. Url: ${process.env.FRONT_ADDRESS}/sign-up/confirmation/${confirmationCode}`,
    html: `<b>${message}</b>. Clique <a href="${process.env.FRONT_ADDRESS}/sign-up/confirmation/${confirmationCode}">aqui</a> para confirmar seu cadastro`
  })
}

export default sendWelcomeEmail
