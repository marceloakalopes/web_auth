// Returns the userId from localStorage.
export default function getUserId(): string | null {
  return localStorage.getItem("userId");
}
