export interface AuthenticationResponse {
  token: string;
  tfaPhoto: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface VerificationDto {
  username: string;
  password: string;
  code: string;
  token: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  repeatPassword: string;
}

export interface JwtPayload {
  exp: number;
  iat: number;
  roles: UserRoles[];
  sub: string;
}

export interface CsrfInterface {
  headerName: string,
  parameterName: string,
  token: string,
}

export type UserRoles = "ROLE_USER" | "ROLE_ADMIN";