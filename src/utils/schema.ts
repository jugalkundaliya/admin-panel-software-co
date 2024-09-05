import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Invalid email format")
  .required("Email is required");

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required");

const usernameSchema = yup
  .string()
  .min(4, "Username must be at least 4 characters")
  .required("Username is required");

export const signUpSchema = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
