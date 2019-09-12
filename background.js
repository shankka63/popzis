

const availablesSites = ['voiranime.com','www.youtube.com','www.twitch.tv'];




chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: availablesSites.map(site=>{
        return new chrome.declarativeContent.PageStateMatcher()
      }),
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


chrome.webNavigation.onCompleted.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'injection.js'}
    );
  });
});
