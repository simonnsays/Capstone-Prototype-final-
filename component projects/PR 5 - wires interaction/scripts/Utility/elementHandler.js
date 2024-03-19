class ElementHandler {
    getCanvas() {
        return document.querySelector('canvas') || null
    }

    getShopElements() {
        return {
            openBtn: document.querySelector('#openShop'),
            closeBtn: document.querySelector('#closeShop'),
            modal: document.querySelector('#shopModal'),
            itemsContainer: document.querySelector('#shopItemsContainer')

        } || null
    }

    getInventoryElements() {
        return {
            openBtn: document.querySelector('#openInv'),
            closeBtn: document.querySelector('#closeInv'),
            modal: document.querySelector('#invModal'),
            itemsContainer: document.querySelector('#invItemsContainer')

        } || null
    }

    getConnectionsElements() {
        return {
            openBtn: document.querySelector('#openWires'),
            closeBtn: document.querySelector('#closeWires'),
            modal: document.querySelector('#wiresModal'),

        } || null
    }
}

export default ElementHandler