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
        return { success_status: true }
    } catch (error) {
        console.error(error);
        return { success_status: false, error_message: "Could not send otp to given phone number" };
    }
};

export const send_otp = async (req, res) => {
    const { phoneNumber } = req.body;
    const newOtp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    try {
        const temp = await sendSMS(newOtp, phoneNumber);
        if (temp.success_status === true) {
            res.send({ "success_status": true, otp: newOtp });
        }
        else {
            res.send(temp);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "success_status": false, "error": "Failed to send OTP" });
    }
};
