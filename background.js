chrome.browserAction.onClicked.addListener(function(tab) {
    window.open("https://fakeblok.com", '_blank');
});

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.sync = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', '']);
_gaq.push(['_trackPageview']);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'article-found') {
        _gaq.push(['_trackEvent', request.title, request.action]);
    }
});

chrome.storage.local.set({
    'isEnabled': false
});

chrome.tabs.onCreated.addListener(function(tab) {
    $.ajax({
        type: "GET",
        url: "https://fakeblok.com/api/v1/sites",
        dataType: "json",
        success: function(data) {
            chrome.storage.local.set({
                "urls": data.data
            });
        },
        error: function(data) {
            console.error("Fakeblok loading failed");
            console.error(data);
        }
    });
});