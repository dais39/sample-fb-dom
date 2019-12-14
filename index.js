const parseText = (elementList) => {
    let text = ''
    if (elementList.length !== 0) {
        for (p of elementList) {
            text += elementList[0].innerText;
        }
    }
    return text
}

const removeAllChildren = (element) => {
    let child = element.lastChild;
    while (child) {
        element.removeChild(child);
        child = element.lastChild;
    }
}

const generateText = (text) => {
    const el = document.createElement('p');
    el.innerHTML = text;
    return el;
}

const filterUserPost = () => {
    const elementList = document.getElementsByClassName('userContent');
    for (el of elementList) {
        const pList = el.getElementsByTagName('p');

        // 投稿テキストを取得
        let userText = parseText(pList);
        console.log(userText)
        const textRequest = {
            text: userText
        }

        // テキストAPIを叩く
        chrome.runtime.sendMessage({ url: "http://localhost:8080/transform", data: textRequest }, function (response) {
            // userContent配下の要素を全消し
            removeAllChildren(el);

            // userContentの子要素としてpタグを追加
            const newEl = generateText(response.data.text);
            el.appendChild(newEl);
        });

        const imgRequest = {
            url: "foo",
            alt: "画像に含まれている可能性があるもの:a、b、c、d"
        }
                // テキストAPIを叩く
        chrome.runtime.sendMessage({ url: "http://localhost:8081/transform", data: imgRequest }, function (response) {
            console.log(response.data.imgPath)
        });
    }
}

filterUserPost();

const observer = new MutationObserver(filterUserPost);

// facebookのfeedは<div role=feed>の子要素<div id=more_pager_pagelet_xxxxx>の孫要素が増えていくので、<div id=more_pager_pagelet_xxxxx>の子要素を監視対象にする
const target = document.querySelector('[role="feed"]').childNodes[2].firstChild;

observer.observe(target, {
    childList: true,
});