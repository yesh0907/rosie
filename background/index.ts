chrome.contextMenus.onClicked.addListener((info) => {
    console.log(`rosie will read ${info.selectionText.length} characters:\n${info.selectionText}`);
    /*
    todo:
    1. send the selected text to an LLM to refine the text and strip out any extra info that isn't needed
    2. send the refined text to a TTS API to generate the audio
    3. play the audio
    */
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Ask Rosie To Read",
        contexts: ["selection"],
        id: "rosieTextReader",
    })
})