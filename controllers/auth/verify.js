const { NotFound } = require("http-errors");
const {User} = require('../../models');

const verify = async(req, res)=> {
    const {verificationToken} = req.params;
    // console.log('verificationToken', verificationToken);
    const user = await User.findOne({verificationToken});
    // console.log('user', user);
    if(!user) {
        throw new NotFound();
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: ""});
    // console.log('user.verificationToken', user.verificationToken);
    res.json({
        message: "Verify success"
    })
}

module.exports = verify;