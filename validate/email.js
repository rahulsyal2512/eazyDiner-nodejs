const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
module.exports = function(email) {
  const check = email.match(EMAIL);
  if (!check) {
    return "Please enter correct email address";
  }
  return;
};
