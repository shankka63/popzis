
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher()],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  //Ajout du sous menu Popzis sur le click droit
  //const contexts = ["page","selection","link","editable","image","video","audio"];
  const contexts = ["page","link","image","video","audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Open in a Popzis";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
    "id": "context" + context});
    console.log("'" + context + "' item:" + id);
  }

});



chrome.contextMenus.onClicked.addListener(onClickHandler);
function onClickHandler(info, tab) {
  console.log(info);
  if(info.frameUrl){
    chrome.tabs.executeScript(
      {code: 'openPopzis(560,315,"'+info.frameUrl+'");'}
    );
  }

  if(info.menuItemId === "contextvideo"){
    chrome.tabs.executeScript(
      {code: 'makeItPop("'+info.pageUrl+'");'}
    );
  }

  if(info.menuItemId === "contextlink"){
    chrome.tabs.executeScript(
      {code: 'makeItPop("'+info.linkUrl+'");'}
    );
  }
};
