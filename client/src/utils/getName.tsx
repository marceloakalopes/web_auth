// Returns the Name from localStorage.
export default function getName(): string | null {
    return localStorage.getItem("Name");
  }
  