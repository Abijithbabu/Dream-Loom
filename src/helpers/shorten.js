export const shorten = (inputString) => {
    const firstCommaIndex = inputString.indexOf(',');
    const title = inputString.slice(0, firstCommaIndex);

    // Extract the content after the first comma
    const content = inputString.slice(firstCommaIndex + 1).trim();

    const desc = `${content.slice(0, 150)}.....`
    return [title, desc]
}