const RESET_PASSWORD = ({ link, name }) => {
    return {
        subject: `${process.env.APP_NAME || ""} - Your reset password link request.`,
        text: "",
        html: `<p>Hi ${name},</p></br>Here is the <a href="${link}">link</a> to reset your password.`
    }
}

module.exports = { RESET_PASSWORD };