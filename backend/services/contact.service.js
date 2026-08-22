import sendContactEmail from './email.service.js'

const createContact = async ({
  name,
  email,
  subject,
  message,
}) => {
  // your existing validation / saving logic

  await sendContactEmail({
    name,
    email,
    subject,
    message,
  })

  return {
    success: true,
    message: 'Message sent successfully',
  }
}

export default createContact