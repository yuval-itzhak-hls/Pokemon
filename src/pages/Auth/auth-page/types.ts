
export type AuthMode = "login" | "signup";

export type AuthPageProps = {
  mode: AuthMode;
};

export type UserPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  AccessToken: string;
  IdToken?: string;
  RefreshToken?: string;
};


  


