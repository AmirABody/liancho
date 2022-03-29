const ERRORS = {
  1001: {
    code: 1001,
    message: "User already exists!",
    translatedMessage: { fr: "کاربر با ایمیل وارد شده قبلاً ثبت نام کرده است!" },
  },
  1002: {
    code: 1002,
    message: "User with the given email does not exist!",
    translatedMessage: { fr: "کاربر با ایمیل وارد شده وجود ندارد!" },
  },
  1003: {
    code: 1003,
    message: "Invalid credentials!",
    translatedMessage: { fr: "رمز عبور اشتباه است!" },
  },
  1004: {
    code: 1004,
    message: "User email not verified yet!",
    translatedMessage: { fr: "ایمیل کاربر هنوز تأیید نشده است!" },
  },
};

module.exports = ERRORS;
