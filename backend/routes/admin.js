const { sendMail } = require("../utils/mailer");

await sendMail(
  user.email,
  "Deposit Approved – FxWealth",
  `<h3>Hello ${user.name}</h3>
   <p>Your deposit of $${deposit.amount} has been approved.</p>`
);
