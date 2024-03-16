class ElementHandler {
    getCanvas() {
        return document.querySelector('canvas') || null
    }

    getShopElements() {
        return {
            openBtn: document.querySelector('#openShop'),
            closeBtn: document.querySelector('#closeShop'),
            modal: document.querySelector('#shopModal'),

        } || null
    }

    getInventoryElements() {
        return {
            openBtn: document.querySelector('#openInv'),
            closeBtn: document.querySelector('#closeInv'),
            modal: document.querySelector('#invModal'),

        } || null
    }
}

export default ElementHandler