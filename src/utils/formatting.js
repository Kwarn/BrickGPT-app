export const removeNewLineCharacters = (string) => {
    return string.replace(/(\r\n|\n|\r)/gm, "")
}