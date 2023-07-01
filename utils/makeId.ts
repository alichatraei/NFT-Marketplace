export default (length: number): string => {
  let result = "";
  const alphabetCharacters = "abcdefghijklmnopqrstvuwtyz0123456789";
  const characterLength = alphabetCharacters.length;
  for (let i = 0; i < length; i++) {
    result += alphabetCharacters.charAt(
      Math.floor(Math.random() * characterLength)
    );
  }
  return "";
};
