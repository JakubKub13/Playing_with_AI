require('dotenv').config();

const { read, realpath } = require('fs');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const AIbrain = new OpenAIApi(configuration);

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion() {
    return new Promise((resolve, reject) => {
        readline.question("Ask anything (type q to quit): ", (prompt) => {
            if (prompt === "q") {
                resolve(false);
            } else {
                resolve(prompt);
            }
        });
    });
}

async function getMaxTokens() {
    return new Promise((resolve, reject) => {
        readline.question("Enter the max number of tokens(length of output): ", (maxTokens) => {
            resolve(maxTokens);
        });
    });
}

async function getCompletion(prompt, maxTokens) {
    try {
        const response = await AIbrain.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: parseInt(maxTokens),
            temperature: 0,
        });

        if (!response || !response.data || !response.data.choices) {
            throw new Error("Invalid response from API");
        }

        return response.data.choices[0].text;
    } catch (error) {
        throw error;
    }
}

async function askToContinue() {
    return new Promise((resolve, reject) => {
        readline.question("Do you want to continue asking questions? (y/n): ", (continueResponse) => {
            if (continueResponse === "n") {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

async function main() {
    while (true) {
        const prompt = await askQuestion();
        if (prompt === false) {
            break;
        }

        const maxTokens = await getMaxTokens();
        try {
            const completion = await getCompletion(prompt, maxTokens);
            console.log(completion);
        } catch (error) {
            console.error(error);
        }

        const shouldContinue = await askToContinue();
        if (!shouldContinue) {
            break;
        }
    }
}

main();

        