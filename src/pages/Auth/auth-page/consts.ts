export const LOCAL_STORAGE_USERS_KEY = "users";

export const LOCAL_STORAGE_CURRENT_USER_KEY = "currentUser";

export const AuthPaths = {
  AllPokemons: "/all-pokemons",
  Login: "/login",
  Signup: "/signup",
  ForgotPassword: "/forgot-password",
} as const; 


export const AuthErrorMessages = {
   UserNotFound : "User not exist or invalid details, check details again",
   EmailAlreadyRegistered: "Email already registered",
}