import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PasswordMatchValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {

  const password: string = group.get("password").value;
  const password2: string = group.get("password2").value;

  const valid: boolean = (password === password2);

  if (!valid) {
    return { password: { message: "Passwords must match" } };
  }

  return null;
};
