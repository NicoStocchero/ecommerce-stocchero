/**
 * @fileoverview Profile information validation schemas using Zod.
 * Provides validation schemas for user profile data and personal information.
 * @author Stocchero
 * @version 1.0.0
 */

import { z } from "zod";

/**
 * Optional personal information validation schema.
 * Validates additional profile fields that users can provide.
 *
 * @type {z.ZodObject}
 * @example
 * ```javascript
 * const profileData = {
 *   displayName: "Juan Pérez",
 *   phone: "+54 9 11 1234-5678",
 *   dateOfBirth: "1990-05-15",
 *   address: "Av. Corrientes 1234, Buenos Aires"
 * };
 *
 * const result = profileInfoSchema.safeParse(profileData);
 * if (result.success) {
 *   // Profile data is valid
 *   await updateProfile(result.data);
 * }
 * ```
 */
export const profileInfoSchema = z.object({
  // Required fields
  displayName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre debe tener menos de 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s'-]+$/,
      "Solo se permiten letras, espacios, guiones y apostrofes"
    ),

  // Optional fields
  phone: z
    .string()
    .regex(
      /^(\+54\s?)?(9\s?)?(\d{2,4}\s?)\d{4}-?\d{4}$|^(\+54\s?)?(9\s?)?(\d{3}\s?)\d{3}-?\d{4}$/,
      "Ingresa un teléfono argentino válido"
    )
    .optional()
    .or(z.literal("")),

  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)")
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 120;
    }, "La edad debe estar entre 13 y 120 años")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .min(10, "La dirección debe tener al menos 10 caracteres")
    .max(100, "La dirección debe tener menos de 100 caracteres")
    .optional()
    .or(z.literal("")),

  // Additional optional fields
  bio: z
    .string()
    .max(200, "La biografía debe tener menos de 200 caracteres")
    .optional()
    .or(z.literal("")),

  occupation: z
    .string()
    .max(50, "La ocupación debe tener menos de 50 caracteres")
    .optional()
    .or(z.literal("")),

  website: z
    .string()
    .url("Ingresa una URL válida")
    .optional()
    .or(z.literal("")),
});

/**
 * Profile field configuration for dynamic form generation.
 * Defines form fields, their types, and validation rules.
 */
export const profileFieldsConfig = [
  {
    key: "displayName",
    label: "Nombre Completo",
    placeholder: "Ingresa tu nombre completo",
    type: "text",
    required: true,
    maxLength: 50,
    icon: "person-outline",
  },
  {
    key: "phone",
    label: "Teléfono",
    placeholder: "+54 9 11 1234-5678",
    type: "phone",
    required: false,
    maxLength: 20,
    icon: "call-outline",
  },
  {
    key: "dateOfBirth",
    label: "Fecha de Nacimiento",
    placeholder: "DD/MM/AAAA",
    type: "date",
    required: false,
    icon: "calendar-outline",
  },
  {
    key: "address",
    label: "Dirección",
    placeholder: "Av. Corrientes 1234, Buenos Aires",
    type: "text",
    required: false,
    maxLength: 100,
    icon: "location-outline",
  },
  {
    key: "bio",
    label: "Biografía",
    placeholder: "Cuéntanos algo sobre ti...",
    type: "multiline",
    required: false,
    maxLength: 200,
    icon: "document-text-outline",
  },
  {
    key: "occupation",
    label: "Ocupación",
    placeholder: "Ej: Desarrollador, Diseñador, Estudiante",
    type: "text",
    required: false,
    maxLength: 50,
    icon: "briefcase-outline",
  },
  {
    key: "website",
    label: "Sitio Web",
    placeholder: "https://mi-sitio.com",
    type: "url",
    required: false,
    maxLength: 100,
    icon: "globe-outline",
  },
];

/**
 * Default values for profile fields.
 * Used for initializing forms and providing fallbacks.
 */
export const defaultProfileData = {
  displayName: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  bio: "",
  occupation: "",
  website: "",
};
