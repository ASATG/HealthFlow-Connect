import dotenv from 'dotenv';
dotenv.config();
import axios from "axios";
import otpGenerator from 'otp-generator';

const sendSMS = async (newOtp, number) => {
    const url = "https://www.fast2sms.com/dev/bulkV2";
    const apiKey = process.env.OTP_ACCESS_KEY;

    try {
        const response = await axios.post(url, {
            numbers: number,
            variables_values: newOtp,
            route: "otp"
        }, {
            headers: {
                "authorization": apiKey,
                "cache-control": "no-cache"
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const send_otp = async (req, res) => {
    const { phoneNumber } = req.body;
    const newOtp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    try {
        await sendSMS(newOtp, phoneNumber);
        res.send({ "success_status": true, otp: newOtp });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "success_status": false, "error": "Failed to send OTP" });
    }
};
