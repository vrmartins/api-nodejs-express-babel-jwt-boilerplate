const nodemailer = require('nodemailer')
// const { decode } = require('./base64')

/**
 * @param {Object} params Parameters to send email
 * @param {Object} params.from Sender address
 * @param {Object} params.to List of receivers, separated by commas
 * @param {Object} params.subject Subject line
 * @param {Object} params.text Plain text body
 * @param {Object} params.html HTML body
 * @param {Object} params.attachments Array of attachments
 * @return {Promise}
 */
const sendEmail = (params) => {
  // TODO: Configurar o remetente
  const transporter = nodemailer.createTransport({
    //     // host: 'smtp.ethereal.email',
    //     // port: 587,
    //     // secure: false, // true for 465, false for other ports
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.APP_EMAIL_ADDRESS,
    //         pass: decode(process.env.APP_EMAIL_PASSWORD)
    //     }
    // })
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'bessie.baumbach65@ethereal.email',
      pass: 'dNf5wzHwzb863p9UnA'
    }
  })

  return transporter.sendMail(params).then((info) => {
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    return info
  })
}

module.exports = sendEmail
