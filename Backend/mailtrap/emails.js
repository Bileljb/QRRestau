import { client, sender } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]
    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Verification Email Sent Successfully")
    } catch (error) {
        throw Error(`Error Sending Verification Email ${error}`)
    }
}

export const sendWelcomeEmail = async (email, firstname) => {
    const recipient = [{ email }]
    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            template_uuid: "87c216ae-0f83-4669-bd52-159bc57b424a",
            template_variables: {
                company_info_name: "RestauQR",
                username: firstname
            }
        })
        console.log("Welcome Email Sent Successfully!")
    } catch (error) {
        throw Error(`Error Sending Welcome Email ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipient = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset",
        });

        console.log("Password reset email sent successfully:", response);
        return response;

    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
};


export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Password reset successfully!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        })
    } catch (error) {
        console.error("Error sending changing psw success", error)
        throw new error(`Error sending changing psw success: ${error}`)
    }
}