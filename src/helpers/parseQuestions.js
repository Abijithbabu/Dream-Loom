export default function parseQuestions(inputString) {
    // Replace escaped characters and split the string by comma
    const arrayStrings = inputString.replace(/\\n/g, '').split(',\n');
    const parsedObjects = arrayStrings.map(str => {
        str.replace(/\\|"/g, '');
        // Extract question, options, and answer using regex 
        const question = str.match(/question: "(.*?)"/)[1];
        const options = str.match(/options: \[(.*?)\]/)[1].split('", "');
        options.map(word => word.replace(/\\/g, '').replace(/"/g, ''));
        const sanitizedOptions = options.map(word => word.replace(/\\/g, '').replace(/"/g, ''));
        const answer = str.match(/answer: "(.*?)"/)[1];

        return { question, options: sanitizedOptions, answer };
    });

    return parsedObjects;
}