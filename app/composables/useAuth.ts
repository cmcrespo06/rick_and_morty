import { useAuthStore } from '~/stores/auth'
import { validateLoginForm, hasErrors } from '~/types-and-utils/validators'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const formErrors = ref({
    email: '',
    password: ''
  })

  
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const isLoading = computed(() => authStore.isLoading)
  const authError = computed(() => authStore.error)
  const userEmail = computed(() => authStore.userEmail)

  // Validación en tiempo real
  const validateForm = (): boolean => {
    const errors = validateLoginForm(email.value, password.value)
    formErrors.value = errors
    return !hasErrors(errors)
  }

  // Limpiar error de un campo al escribir
  const clearFieldError = (field: 'email' | 'password') => {
    formErrors.value[field] = ''
    authStore.clearError()
  }


  const handleLogin = async () => {
    if (!validateForm()) return

    const success = await authStore.login(email.value, password.value)

    if (success) {
      await router.push('/dashboard')
    }
  }

  const handleLogout = async () => {
    authStore.logout()
    await router.push('/')
  }

  return {
    email,
    password,
    formErrors,
    isAuthenticated,
    isLoading,
    authError,
    userEmail,
    handleLogin,
    handleLogout,
    clearFieldError
  }
}