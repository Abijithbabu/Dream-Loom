export const shorten = (inputString) => {
    let title = inputString.trim();
    let desc = '';

    // Check if the title is enclosed in double quotes
    if (title.startsWith('"')) {
        const closingQuoteIndex = title.indexOf('"', 1); // Find the closing quote
        if (closingQuoteIndex !== -1) {
            title = title.slice(1, closingQuoteIndex); // Extract the title within quotes
            desc = inputString.slice(closingQuoteIndex + 1).trim(); // Extract the content after the closing quote
        }
    }

    // If the title is not enclosed in quotes, find the first space to separate title and content
    if (!desc) {
        const nIndex = title.indexOf('\n')
        const cIndex = title.indexOf(',')
        const firstSpaceIndex = nIndex > cIndex ? cIndex : nIndex
        if (firstSpaceIndex !== -1) {
            desc = title.slice(firstSpaceIndex + 1).trim();
            title = title.slice(0, firstSpaceIndex);
        }
    }
    desc = `${desc.slice(0, 150)}.....`;
    return [title, desc];
};
