/**
 * Mapea los errores de un resultado de Zod a un objeto simple: { [campo]: mensaje }
 * @param {import("zod").SafeParseReturnType} result
 * @returns {Object.<string, string>}
 */
export function mapZodErrors(result) {
  const errors = {};
  if (result?.error?.errors) {
    result.error.errors.forEach((err) => {
      // err.path puede tener varios niveles: ej ['direccion', 'calle']
      // Soporta validaciones anidadas, muestra el primer campo implicado
      const field =
        Array.isArray(err.path) && err.path.length ? err.path[0] : "unknown";
      // Si ya hay error en ese campo, no lo pisa (para mostrar solo el primero, opcional)
      if (!errors[field]) errors[field] = err.message;
    });
  }
  return errors;
}

/**
 * Chequea si el form tiene al menos un campo vacío (para evitar submits inútiles)
 * @param {Object} formData
 * @returns {boolean}
 */
export function hasEmptyFields(formData) {
  return Object.values(formData).some(
    (value) => !value || value.trim?.() === ""
  );
}

/**
 * Valida un solo campo con Zod schema, útil para onBlur de un input
 * @param {import("zod").ZodSchema} schema
 * @param {Object} formData
 * @param {string} field
 * @returns {string} errorMessage ("" si es válido)
 */
export function validateField(schema, formData, field) {
  // Zod no tiene validateAt, así que armamos un sub-form con sólo ese campo
  try {
    const singleFieldSchema = schema.pick({ [field]: true });
    const result = singleFieldSchema.safeParse({ [field]: formData[field] });
    if (!result.success) {
      return result.error.errors[0]?.message || "Error de validación";
    }
    return "";
  } catch {
    return "";
  }
}

/**
 * Devuelve un objeto vacío para errores de todos los campos del form
 * @param {Object} formData
 * @returns {Object.<string, string>}
 */
export function emptyErrors(formData) {
  const errors = {};
  Object.keys(formData).forEach((key) => {
    errors[key] = "";
  });
  return errors;
}
