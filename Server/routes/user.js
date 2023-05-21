const router = require("express").Router();
const User = require("../db/models/user");
let CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");

router.post("/signup", async (req, resp) => {
  console.log(req)
  let user = new User({
    user_name: req.body.user_name,
    user_password: CryptoJS.SHA512(req.body.user_password).toString(),
    user_email: req.body.user_email,
    history: req.body.history,
    total_balance: req.body.total_balance,
    income: req.body.income,
    expense: req.body.expense,
  });
  try {
    await user.save();
    resp.json({ success: true });
  } catch (error) {
    resp.json({ success: false });
  }
});
router.post("/login", async (req, resp) => {
  let user = await User.findOne({
    user_email: req.body.user_email,
    user_password: CryptoJS.SHA512(req.body.user_password).toString(),
  });
  if (user) {
    jsonwebtoken.sign(
      { id: user._id },
      "cat says miooon in FSD",
      {
        expiresIn: "7d",
      },
      function (err, Token) {
        resp.json({
          success: true,
          user,
          token: Token,
        });
      }
    );
  } else {
    resp.json({ success: false });
  }
});

router.post("/check-session", (req, res) => {
  jsonwebtoken.verify(
    req.body.token,
    "cat says miooon in FSD",
    async (err, data) => {
      if (data) {
        let user = await User.findById(data.id);
        res.json({ success: true, user });
      } else {
        res.json({ success: false });
      }
    }
  );
});

router.put("/transaction", async (req, resp) => {
  await User.findByIdAndUpdate(req.body.id, {
    $push: { history: req.body.data },
  });
  resp.end()
});

module.exports = router;
