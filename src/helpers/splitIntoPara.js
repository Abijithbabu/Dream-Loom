export default function splitIntoParagraphs(inputString) {
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
        const firstSpaceIndex = title.indexOf(',');
        if (firstSpaceIndex !== -1) {
            desc = title.slice(firstSpaceIndex + 1).trim();
            title = title.slice(0, firstSpaceIndex);
        }
    }

    // Split the content into sentences
    const sentences = desc.split('. ');

    // Create paragraphs with every 3 sentences
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 3) {
        const paragraph = sentences.slice(i, i + 3).join('. ');
        paragraphs.push(paragraph);
    }
    // Join paragraphs with <br> tag
    const resultString = `<b>${title}</b><br><br>${paragraphs.join('<br><br>')}`;

    return resultString;
}
