export enum API {
  REGISTER = "/api/v1/auth/register",
  LOGIN = "/api/v1/auth/login",
  VERIFY = "/api/v1/auth/verify",
  PUBLIC_NOTES = "/api/v1/note/public",
  OWNED_NOTES = "/api/v1/note",
  ADD_NOTE = "/api/v1/note/add",
  ALLOWED_NOTES = "/api/v1/note/allowed",
  DETAILS_NOTE = "/api/v1/note/details",
  CRSF_TOKEN = "/api/v1/csrf/token",
}