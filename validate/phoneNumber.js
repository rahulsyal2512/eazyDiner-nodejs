const NUM = /^(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)$/;

module.exports = function(mobileNumber) {
  const check = mobileNumber.match(NUM);
  if (!check) {
    return "Please enter correct mobile number";
  }
  return;
};
