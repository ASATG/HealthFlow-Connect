import dotenv from 'dotenv'
import Twilio from 'twilio';
dotenv.config()

const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



class UserController {
    //Send OTP to User
    static sendOTP = async (req, res) => {
        const { countryCode, phoneNumber } = req.body;
        try {
            const otpResponse = await client.verify
                .v2.services(TWILIO_SERVICE_SID)
                .verifications.create({
                    to: `${countryCode}${phoneNumber}`,
                    channel: "sms",
                });
            res.status(200).send(`${otpResponse}\nOTP Sent Successfully`);
        } catch (error) {
            res.status(400).send(`${error}\nSomething went wrong!`);
        }
    }

    static verifyOTP = async (req, res) => {
        const { countryCode, phoneNumber, otp } = req.body;
        try {
            const verifiedResponse = await client.verify
                .v2.services(TWILIO_SERVICE_SID)
                .verificationChecks.create({
                    to: `${countryCode}${phoneNumber}`,
                    code: otp,
                });
            res.status(200).send(`${verifiedResponse.status}\nOTP Verified Successfully`);
        } catch (error) {
            res.status(400).send(`${error}\nSomething went Wrong`);
        }
    }
}

export default UserController