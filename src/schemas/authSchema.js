import { z } from "zod";

// --- Reglas DRY para password ---
export const passwordRules = z
  .string()
  .min(8, "Debe tener al menos 8 caracteres")
  .max(40, "Debe tener menos de 40 caracteres")
  .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
  .regex(/[a-z]/, "Debe tener al menos una minúscula")
  .regex(/[0-9]/, "Debe tener al menos un número")
  .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial");

// --- Registro ---
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

// --- Login (sólo que no estén vacíos y que el email sea válido) ---
export const loginSchema = z.object({
  email: z
    .string()
    .email("Ingresa un email válido")
    .min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

/*
 * Uso recomendado:
 * import { signUpSchema, loginSchema } from "../../schemas/authSchema";
 * const result = loginSchema.safeParse(formData);
 */
