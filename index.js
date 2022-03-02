let gpt3Options = {
  // "engine": "text-davinci-001",
  "prompt": "this is the text that gets sent",
  "temperature": 0.7,
  "max_tokens": 64,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}

function main () {
  logseq.Editor.registerSlashCommand(
    'GPT-3',
    async () => {
      const { content, uuid } = await logseq.Editor.getCurrentBlock({includeChildren: true})
      gpt3Options.prompt = content

      postData('https://api.openai.com/v1/engines/text-davinci-001/completions', gpt3Options)
      .then(data => {
        logseq.Editor.insertBlock(uuid, data.choices[0].text, { before: false, sibling: true })
      });

    }
  )

  
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer PASTE-YOUR-APIKEY-HERE'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// bootstrap
logseq.ready(main).catch(console.error)
