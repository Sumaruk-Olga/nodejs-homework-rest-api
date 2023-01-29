const {Conflict} = require("http-errors");
const {nanoid} = require("nanoid");
const gravatar = require("gravatar");
const {User} = require('../../models');
const sendEmail = require('../../helpers/sendEmail');

const {BASE_URL} = process.env;

const register = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw new Conflict(`User with ${email} already exist`);
}
const avatarURL = gravatar.url(email);
const verificationToken = nanoid();
const newUser = new User({email, avatarURL, verificationToken});
newUser.setPassword(password);
newUser.save();
const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`    
}

await sendEmail(verifyEmail);

res.status(201).json({
    status: "success",
    code: 201,
    data: {
        user: {
            email, 
            subscription: newUser.subscription,
            avatarURL           
        }
    }
});
}

module.exports = register;