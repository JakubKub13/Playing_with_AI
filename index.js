require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const AIbrain = new OpenAIApi(configuration);

async function main() {
    const response = await AIbrain.createCompletion({
        model: "text-davinci-003",
        prompt: "Write me a tutorial on setting up GPT-3 API",
        max_tokens: 250,
        temperature: 0,
    });

    const completion = response.data.choices[0].text
    console.log(completion)
}

main();
