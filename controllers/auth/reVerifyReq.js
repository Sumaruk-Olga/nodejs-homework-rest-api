const { NotFound, BadRequest } = require("http-errors");
const { User } = require('../../models');
const sendEmail = require('../../helpers/sendEmail');

const {BASE_URL} = process.env;

const reVerifyReq = async (req, res) => {
    const { email } = req.body;
    console.log('email', email);
    const result = await User.findOne({ email });
    console.log('result', result);
    if (!result) {
    throw new NotFound();
    }
    console.log('result.verify', result.verify);
    if (result.verify) {
    throw new BadRequest(`Verification has already been passed`);
    }

    const mail ={
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${result.verificationToken}">Click verify email</a>`    
    }
    console.log('mail', mail);

    await sendEmail(mail);

    res.json('Verification email sent');
};

module.exports = reVerifyReq;