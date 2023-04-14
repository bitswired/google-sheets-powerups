function WHISPER(audioUrl, language) {

    const apiKey = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Config")
      .getRange("A2")
      .getValue()
  
    function getFile(fileURL) {
      const response = UrlFetchApp.fetch(fileURL);
      const res = response.getBlob()
      return res
    }
  
    const audioBlob = getFile(audioUrl)
  
    const formData = {
    'model': 'whisper-1',
    'file': audioBlob,
    'language': language
    };  
  
    const url = 'https://api.openai.com/v1/audio/transcriptions';
    const options = {
      'method' : 'post',
      'payload': formData,
      'headers': {
        'Authorization': "Bearer " + apiKey
      }
    };
  
    const res = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(res.getContentText());
    return data.text  
  }