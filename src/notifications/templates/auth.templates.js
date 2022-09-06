const RESET_PASSWORD = ({ link, name }) => {
    return {
        subject: `${process.env.APP_NAME || ""} - Your reset password link request.`,
        text: "",
        html: `<p>Hi ${name},</p></br>Here is the <a href="${link}">link</a> to reset your password. Please note this link will expire in 2 days.`
    }
}

const EMAIL_OTP = ({ otp, name }) => {
    return {
        subject: `${process.env.APP_NAME || ""} - Your otp.`,
        text: "",
        html: `<p>Hi ${name},</p></br>Here is the otp - ${otp}. Please note this otp will expire in 30 minutes.`
    }
}

module.exports = { RESET_PASSWORD, EMAIL_OTP };