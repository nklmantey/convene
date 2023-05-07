function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/;
  return regex.test(email) && email.trim().length > 0;
}

function validatePassword(password: string): boolean {
  return password.length >= 8 && password.trim().length > 0;
}

function validateMatchPassword(
  password: string,
  confirmPassword: string
): boolean {
  return password.trim() === confirmPassword.trim();
}

export { validateEmail, validatePassword, validateMatchPassword };
