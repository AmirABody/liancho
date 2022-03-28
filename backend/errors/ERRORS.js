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
};

module.exports = ERRORS;
