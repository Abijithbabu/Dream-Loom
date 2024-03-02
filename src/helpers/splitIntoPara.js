export default function splitIntoParagraphs(inputString) {

    const sentences = inputString.split('. ');

    // Create paragraphs with every 3 sentences
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 3) {
        const paragraph = sentences.slice(i, i + 3).join('. ');
        paragraphs.push(paragraph);
    }

    // Join paragraphs with <br> tag
    const resultString = paragraphs.join('<br><br>');

    return resultString;
}