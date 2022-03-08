// Check password strength
// 1. Containing at least one lowercase character
// 2. Containing at least one uppercase character
// 3. Containing at least one digit
// 4. Containing at least 8 characters
// function checkPasswordStrength(password) {
//   return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password);
// }

// Validate email
function validateEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

module.exports = { validateEmail };
