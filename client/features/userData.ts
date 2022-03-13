export interface registerData {
  name: string;
  email: string;
  password: string;
}

export interface loginData {
  email: string;
  password: string;
}

export interface userState {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
}
