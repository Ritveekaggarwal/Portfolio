import sendContactEmail from '../services/contact.service.js'

const sendContactController = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    await sendContactEmail({
      name,
      email,
      subject,
      message,
    })

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Contact email error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
    })
  }
}

export default sendContactController