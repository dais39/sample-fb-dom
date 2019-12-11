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
        let text = parseText(pList);
        console.log(text)

        // userContent配下の要素を全消し
        removeAllChildren(el);

        // userContentの子要素としてpタグを追加
        const newEl = generateText('Hello world!');
        el.appendChild(newEl);
    }
}

filterUserPost();

const observer = new MutationObserver(filterUserPost);

// facebookのfeedは<div role=feed>の子要素<div id=more_pager_pagelet_xxxxx>の孫要素が増えていくので、<div id=more_pager_pagelet_xxxxx>の子要素を監視対象にする
const target = document.querySelector('[role="feed"]').childNodes[2].firstChild;

observer.observe(target, {
    childList: true,
});