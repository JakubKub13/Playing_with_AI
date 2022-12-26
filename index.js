require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const AIbrain = new OpenAIApi(configuration);

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    readline.question("Ask anything (type q to quit): ", async (prompt) => {
        if (prompt === "q") {
            readline.close();
            return;
        }

        readline.question("Enter the max number of tokens(length of output): ", async (max_tokens) => {
            const response = await AIbrain.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: parseInt(max_tokens),
                temperature: 0,
            });

            const completion = response.data.choices[0].text;
            console.log(completion);
        });
    }); 
}

main();
