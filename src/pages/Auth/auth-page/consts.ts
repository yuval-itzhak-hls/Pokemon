
export const LOCAL_STORAGE_USERS_KEY = "users";

export const LOCAL_STORAGE_CURRENT_USER_KEY = "currentUser";

export const AuthPaths = {
  AllPokemons: "/all-pokemons",
  Login: "/login",
  Signup: "/signup",
  ForgotPassword: "/forgot-password",
} as const; 


export const AuthErrorMessages = {
   ErrorOccurred : "An error occurred. Please try again.",
   NetworkError: "Network error. Please try again.",
}