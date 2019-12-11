const hide_user_content = () => {
    const elementList = document.getElementsByClassName('userContent');

    // 投稿されたテキストを定型文に差し替える
    for (el of elementList) {
        const pList = el.getElementsByTagName('p');

        // 投稿テキストを取得
        let text = ''
        if (pList.length !== 0){
            for (p of pList) {
                text += pList[0].innerText;
            }
        }
        console.log(text)

        // userContent配下の要素を全消し
        let child = el.lastChild;
        while(child){
            el.removeChild(child);
            child = el.lastChild;
        }

        const newEl = document.createElement('p');
        newEl.innerText = 'Hello World!';
        el.appendChild(newEl);
        // userContentの子要素としてpタグを追加
    }
}

const observer = new MutationObserver(hide_user_content);

// facebookのfeedは<div role=feed>の子要素<div id=more_pager_pagelet_xxxxx>の孫要素が増えていくので、<div id=more_pager_pagelet_xxxxx>の子要素を監視対象にする
const target = document.querySelector('[role="feed"]').childNodes[2].firstChild;

observer.observe(target, {
    childList: true,
});

hide_user_content();