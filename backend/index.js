const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000; 
const axios = require("axios"); 
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Define an endpoint to generate quotes
app.post('/convert', async (req, res) => {
    const { code, language } = req.body;
    const apiKey = process.env.apikey;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `Act as a code convertor. I will provide you the code and you have to convert it to ${language}. No need to explain the code. Just provide the converted code. Also, if there are two or three code snippet convert all the code seperately.\n ${code}`,
          max_tokens: 500, // Adjust as needed
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`
          },
        }
      );
  
      const convertedCode = response.data.choices[0].text;
      res.json({ convertedCode });
    } catch (error) {
      console.error('Error converting code:', error);
      res.status(500).json({ error: 'An error occurred while converting code.' });
    }
  });

app.post('/debug', async (req, res) => {
    const { code } = req.body;
    const apiKey = process.env.apikey;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `Act as a code debugger. I will provide you the code snippet and you have to debug it. You have to provide me the response in output section and also explain the code.\n ${code}`,
          max_tokens: 500, // Adjust as needed
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`
          },
        }
      );
  
      const debuggedCode = response.data.choices[0].text;
      res.json({ debuggedCode });
    } catch (error) {
      console.error('Error converting code:', error);
      res.status(500).json({ error: 'An error occurred while converting code.' });
    }
  })

app.post('/quality', async (req, res) => {
    const { code } = req.body;
    const apiKey = process.env.apikey;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `Act as a code quality checker. I will provide you the code snippet and you have to check quality of the code. You have to provide me your suggestions to improve the code. And also tell me what is need to be fix to make the code looks better and understandable to everyone.\n ${code}`,
          max_tokens: 1000, // Adjust as needed
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`
          },
        }
      );
  
      const checkedCode = response.data.choices[0].text;
      res.json({ checkedCode });
    } catch (error) {
      console.error('Error converting code:', error);
      res.status(500).json({ error: 'An error occurred while converting code.' });
    }
  })



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
