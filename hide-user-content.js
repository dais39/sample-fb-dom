const hide_user_content = () => {
    const elementList = document.getElementsByClassName('userContent');

    // while (elements.length !== 0) {
    //     elements[0].parentNode.removeChild(elements[0]);
    // }

    let text = '';
    for (el of elementList) {
        const pList = el.getElementsByTagName('p');
        for (p of pList) {
            text += p.innerText;
        }
        console.log(text);
        text = '';
    }
}

const observer = new MutationObserver(hide_user_content);
const target = document.querySelector('[role="feed"]').childNodes[2];

console.log(target);

observer.observe(target, {
    childList: true,
    subtree: true
});

hide_user_content();