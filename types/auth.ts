export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  bio?: string;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  bio: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (values: LoginFormValues) => Promise<void>;
  register: (values: RegisterFormValues) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}
