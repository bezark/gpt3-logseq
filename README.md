# Readme
Using GPT-3 in [[logseq]] is actually remarkably easy. The folks over at OpenAI have built a really powerful model with [pretty good documentation](https://beta.openai.com/docs/api-reference/answers)
All that you really need to do is send a post request to their site with the propper api key in the header of the message.
This is all the code the plugin uses:
``` js
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
		console.log(content)
		gpt3Options.prompt = content
	  
		postData('https://api.openai.com/v1/engines/text-davinci-001/completions', gpt3Options)
		.then(data => {
		  logseq.Editor.insertBlock(uuid, data.choices[0].text, { before: false, sibling: true })
		 console.log(data);
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
```

All you need to do to use it is:
- [Sign Up for OpenAI](https://beta.openai.com/signup)
- [Copy your API KEY](https://beta.openai.com/account/api-keys)
- Paste it into line 40. Make sure to leave the word 'Bearer' in the string- the line should look like `'Authorization': 'Bearer sk-salkfjasdpfijasfkjavvkblahblahsecretsecretkey'`
- Load the unpacked plugin
- Type some stuff you want to send to gpt-3
- Use the slash command 'GPT-3'

Things to note are that it only grabs the text of the current block, and the options at the top are somewhat arbitrary. Editing them suit your needs.
There's a lot more that can be done with this model and plugin- feel free to improve on this
