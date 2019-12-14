chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        $.ajax({
            url: request.url,
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify(request.data),
            success: function (res) {
                sendResponse({ data: res });
            }
        })
    }
);