export const netCoreValidationErrors = args => {
  const { validationErrors, propName } = args;
  const modelErrors = validationErrors;

  if (!modelErrors || typeof propName !== "string") return null;

  let field = modelErrors.find(element => {
    return element.name.toLowerCase() === propName.toLowerCase();
  });

  field = field || {};

  return field.errors.length > 0 ? field.errors.join(" ") : null;
};

export const checkIfValid = ({ validationErrors, propName }) => {
  const fieldErrors = netCoreValidationErrors({ validationErrors, propName });

  if (!fieldErrors) return false;

  return { content: fieldErrors, pointing: "below" };
};
