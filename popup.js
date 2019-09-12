let popup_button = document.getElementById('popup_button');

popup_button.onclick = function(element) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'makeItPop();'}
        );
    });
};
