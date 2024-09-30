export default interface iSignIn {
  email: string,
  password: string
  setError: (value: string) => void
}