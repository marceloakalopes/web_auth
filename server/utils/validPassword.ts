import bcrypt from "bcrypt";

/**
 * Function to compare the password entered by the user with the hashed password stored in the database
 * @param {string} password - password entered by the user
 * @param {string} hash - hashed password stored in the database
 * @returns {boolean} - returns true if the password is valid, false otherwise
 */
export function validPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
