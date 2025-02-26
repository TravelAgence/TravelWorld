// filepath: /C:/Users/yassine/Desktop/WORK25/TravelWorld/backend/nodeMailer/nodeMailer.js
import nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: "yassinedebich214@gmail.com",
        pass: "wheg cnxh qktr zihe" // Replace with your generated app password
    },
});

export const sendEmail = async (email, activationCode) => {
    try {
        await transporter.sendMail({
            from: "yassinedebich214@gmail.com",
            to: email,
            subject: "Account activation",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header bg-primary text-white">
                                        <h4>Account Activation</h4>
                                    </div>
                                    <div class="card-body">
                                        <p>Dear User,</p>
                                        <p>Thank you for registering. Please click the link below to activate your account:</p>
                                        <a href="http://localhost:3000/account-activation/${activationCode}" class="btn btn-primary">Activate Account</a>
                                        <p>If you did not request this, please ignore this email.</p>
                                        <p>Best regards,<br>Travel Agency Team</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });
    } catch (err) {
        console.log(err);
    }
};
// Send email to user confirming visa request submission
export const sendVisaConfirmationEmail = async (email, message) => {
    try {
        await transporter.sendMail({
            from: "yassinedebich214@gmail.com",
            to: email,
            subject: "Visa Request Confirmation",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header bg-primary text-white">
                                        <h4>Visa Request Confirmation</h4>
                                    </div>
                                    <div class="card-body">
                                        <p>Dear User,</p>
                                        <p>${message}</p>
                                        <p>Best regards,<br>Travel Agency Team</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });
    } catch (err) {
        console.log(err);
    }
};