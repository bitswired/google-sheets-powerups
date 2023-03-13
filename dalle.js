function DALLE(prompt, dimension) {
    const apiKey = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Config")
      .getRange("A2")
      .getValue()

  const url = 'https://api.openai.com/v1/images/generations';
  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify({
      "prompt": prompt || 'test',
      "n": 1,
      "size": `${dimension || 256}x${dimension || 256}`
    }),
    'headers': {
      'Authorization': "Bearer " + apiKey
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const res = JSON.parse(response.getContentText());

  const image = res.data[0]
  return image.url;

  const images = res.data.map(x => {
    // return x.url;
     let image = SpreadsheetApp
                 .newCellImage()
                 .setSourceUrl(x.url)
                 .build();
      return image;
  });
  return [images]

}