const nodemailer = require("nodemailer");

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "",
    port: process.env.EMAIL_PORT || 0,
    auth: {
        user: process.env.EMAIL_USERNAME || "",
        pass: process.env.EMAIL_PASSWORD || ""
    },
});


const sendMail = async ({ from, to, template }) => {
    try {
        if ((process.env.EMAIL_NOTIFICATION_ENABLED || "no").toLowerCase() === "yes") {
            let info = await transporter.sendMail({
                from,
                to,
                ...template
            });

            console.log("Message sent: %s", info.messageId);
            if (process.env.NODE_ENV === 'development') {
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
        } else {
            console.info("Email notifications not enabled!");
        }
    } catch (e) {
        console.error(e.message);
    }
}

module.exports = { sendMail };