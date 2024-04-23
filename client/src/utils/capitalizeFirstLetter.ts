// Capitalizes the first letter of a string
export default function capitalizeFirstLetter(string: String): String | null{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
