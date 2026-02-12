// Validar formato correcto correo
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validar contraseña (más de 6 caracteres)
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6
}

// Comprobar campos vacíos
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

// Mensajes de error para el formulario
export const getEmailError = (email: string): string => {
  if (!isNotEmpty(email)) return 'El email es obligatorio'
  if (!isValidEmail(email)) return 'El formato del email no es válido'
  return ''
}

export const getPasswordError = (password: string): string => {
  if (!isNotEmpty(password)) return 'La contraseña es obligatoria'
  if (!isValidPassword(password)) return 'La contraseña debe tener más de 6 caracteres'
  return ''
}

// Comprobar formulario completo
export interface LoginFormErrors {
  email: string
  password: string
}

export const validateLoginForm = (email: string, password: string): LoginFormErrors => {
  return {
    email: getEmailError(email),
    password: getPasswordError(password)
  }
}

// Comprobar si hay errores en el formulario
export const hasErrors = (errors: LoginFormErrors): boolean => {
  return Object.values(errors).some(error => error !== '')
}