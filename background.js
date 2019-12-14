chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // const xhr = new XMLHttpRequest();
        // const baseUrl = "http://localhost:8080/transform";
        // const requestBody = {
        //     "text": request.text
        // };

        // xhr.open("POST", baseUrl, false);
        // xhr.setRequestHeader("Content-type", "application/json");
        // const translatedText = xhr.send(JSON.stringify(requestBody));

        $.ajax({
            url: "http://localhost:8080/transform",
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({
                "text": request.text
            }),
            success: function (res) {
                sendResponse({ text: res.text });
            }
        })
    }
);