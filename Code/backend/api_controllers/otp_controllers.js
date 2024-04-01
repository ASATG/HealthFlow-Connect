import dotenv from 'dotenv';
dotenv.config();
import AWS from 'aws-sdk';
import otpGenerator from 'otp-generator';

export const send_otp = async (req, res) => {
    const { phoneNumber } = req.body;
    const new_otp = otpGenerator.generate(6);
    const params = {
        PhoneNumber: "+91" + phoneNumber,
        Message: `YOUR OTP IS ${new_otp}`
    };

    try {
        const response = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
        return res.send({ success_status: true, otp: new_otp });
    } catch (error) {
        return res.send({ success_status: false, error_message: "Error while generating the OTP" });
    }
};
