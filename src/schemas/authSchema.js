/**
 * @fileoverview Authentication validation schemas using Zod.
 * Provides validation schemas for login and signup forms with password security rules.
 * @author Stocchero
 * @version 1.0.0
 */

import { z } from "zod";

/**
 * Reusable password validation schema with strict security rules.
 * Enforces strong password requirements for new user registrations.
 *
 * Validation rules:
 * - Length between 8 and 40 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 *
 * @type {z.ZodString}
 * @example
 * ```javascript
 * const result = passwordRules.safeParse("MiPassword123!");
 * if (!result.success) {
 *   console.log(result.error.issues[0].message);
 * }
 * ```
 */
export const passwordRules = z
  .string()
  .min(8, "Debe tener al menos 8 caracteres")
  .max(40, "Debe tener menos de 40 caracteres")
  .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
  .regex(/[a-z]/, "Debe tener al menos una minúscula")
  .regex(/[0-9]/, "Debe tener al menos un número")
  .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial");

/**
 * User registration validation schema.
 * Validates email, password strength, and password confirmation matching.
 *
 * Validation includes:
 * - Valid and required email address
 * - Password meeting security requirements (passwordRules)
 * - Password confirmation that matches the password
 *
 * @type {z.ZodObject}
 * @example
 * ```javascript
 * const formData = {
 *   email: "user@example.com",
 *   password: "SecurePass123!",
 *   confirmPassword: "SecurePass123!"
 * };
 *
 * const result = signUpSchema.safeParse(formData);
 * if (result.success) {
 *   console.log("Valid data:", result.data);
 * } else {
 *   console.log("Validation errors:", result.error.format());
 * }
 * ```
 */
export const signUpSchema = z
  .object({
    email: z
      .string()
      .email("Ingresa un email válido")
      .min(1, "El email es requerido"),
    password: passwordRules,
    confirmPassword: z.string().min(1, "Confirmá tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

/**
 * User login validation schema.
 * Applies basic validations without strict password rules to allow
 * login with existing passwords that may not meet new security requirements.
 *
 * @type {z.ZodObject}
 * @example
 * ```javascript
 * const credentials = {
 *   email: "user@example.com",
 *   password: "any_existing_password"
 * };
 *
 * const result = loginSchema.safeParse(credentials);
 * if (result.success) {
 *   // Proceed with authentication
 *   await loginUser(result.data);
 * }
 * ```
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Ingresa un email válido")
    .min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});
