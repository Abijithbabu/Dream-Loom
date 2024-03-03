export default function splitIntoParagraphs(inputString) {
    
    const firstCommaIndex = inputString.indexOf(',');

    // Extract the title up to the first comma
    const title = inputString.slice(0, firstCommaIndex);

    // Extract the content after the first comma
    const content = inputString.slice(firstCommaIndex + 1).trim();

    // Split the content into sentences
    const sentences = content.split('. ');

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
