/**
Sends a request to the OpenAI API to generate text using the GPT-3 language model.
@param {string} prompt - The text prompt to generate text from.
@param {number} maxToken - The maximum number of tokens to generate.
@returns {string} - The generated text from the OpenAI API.
*/
function GPT3(prompt, maxToken) {
    const apiKey = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Config").getRange("A2").getValue()
    
    const data = {
    "model": "text-davinci-003",
    "prompt": prompt,
    "max_tokens": maxToken,
    "temperature": 0.8,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "logprobs": null,
    }
    const options = {
      'method' : 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload' : JSON.stringify(data),
      'headers': {
        'Authorization': "Bearer " + apiKey
      }
    };

    const x = UrlFetchApp.fetch('https://api.openai.com/v1/completions', options);
    const res = JSON.parse(x.getContentText());
    return res.choices[0].text
  }