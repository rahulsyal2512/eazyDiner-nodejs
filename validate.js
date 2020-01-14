const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const NUM = /^(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)$/;

var err = [];

exports.checkEmail = email => {
  const check = email.match(EMAIL);
  if (!check) {
    err.push("Please enter correct email address");
    return err;
  }
  return;
};

exports.checkPhoneNumber = mobileNumber => {
  const check = mobileNumber.match(NUM);
  if (!check) {
    err.push("Please enter correct mobile number");
    return err;
  }
  return;
};
