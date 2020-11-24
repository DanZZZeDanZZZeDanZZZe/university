const modalWindow = new ModalWindow('Сделать текст розовым?', (state) => {
    txt.style.color = state === 'done' ? 'pink' : 'black'
})

const btn = document.querySelector('.main__button')
const txt = document.querySelector('.main__text')

btn.onclick = () => modalWindow.renderIn(document.querySelector('.main'))
