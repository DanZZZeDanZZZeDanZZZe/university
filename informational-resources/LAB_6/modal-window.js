class ModalWindow {
    constructor(content, handler) {
        this.HTML = this._createTemplate(content)
        this.state = 'pending'
        this.handler = handler
    }

    renderIn(parent) {
        this.parent = parent
        parent.append(this.HTML)
    }

    _createTemplate(content) {
        const mw = this._createDiv('modal-window')
        const bg = this._createDiv('modal-window__background')
        const box = this._createDiv('modal-window__box')
        const contentHandler = this._createDiv('modal-window__content-handler')
        const buttonOK = this._createButton('OK', 'done', 'modal-window__button')
        const buttonCancel = this._createButton('cancel', 'rejected', 'modal-window__button')

        contentHandler.innerHTML = content
        box.append(contentHandler)
        box.append(buttonOK)
        box.append(buttonCancel)
        bg.append(box)
        mw.append(bg)

        return mw
    }

    _create(tagName, ...classNames) {
        const div = document.createElement(tagName)
        div.classList.add(classNames.join(' '))
        return div
    }

    _createDiv(...classNames) {
        return this._create('div', ...classNames)
    }

    _destroy() {
        this.parent.removeChild(this.HTML)
        this.handler(this.state)
    }

    _createButton(text, state, ...classNames) {
        const btn = this._create('button', ...classNames)
        btn.textContent = text
        btn.addEventListener('click', () => {
            this._destroy()
            this.state = state
            this.handler(this.state)
        })
        return btn
    }
}