const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const UserModel = require("../auth/user.model");

exports.checkVerification = async (req, res, next) => {
  const { verificationToken } = req.params;

  const verifiedUser = await UserModel.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
    }
  );
  if (!verifiedUser) {
    return next(new AppError("User not found", 404));
  }
  return res.status(200).send();
};

exports.emailVerificationSender = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER,
    subject: "Sending with SendGrid is Fun",
    text: "Verification test",
    html: `<p>To verify your account, please follow this <a href='http://localhost:3000/auth/verify/${verificationToken}'>link</a></p> `,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
