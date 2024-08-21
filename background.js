const API_KEY = "your key here";
const API_URL = "https://api.openai.com/v1/chat/completions";
const instructions = `You are a helpful assistant. Your job is to summarize webpages in a concise manner while maintaining all important details. 
          Your intended audience is a university student conducting research. Please ignore any header tags or extraneous text not related to the main content of the page. 
          Do not format text eg. bold, italics. Stick with plain text and use numbers for sections where appropriate.`;

async function summarizeText(text) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: instructions
        },
        { role: "user",
          content: `Summarize the following article/webpage: ${text}`
        },
      ],
      max_tokens: 1000,
      temperature: 0.4
    })
  });

  const data = await response.json();
  console.log(data);
  return data.choices[0].message.content;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "summarize") {
    const summary = summarizeText(message.content).then(summary => {
      sendResponse({ summary });
    });
    return true;
  }
});