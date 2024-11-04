class ElementHandler {
    getSimCanvas() {
        return document.querySelector('#simCanvas') || null
    }

    getShopElements() {
        return {
            openBtn: document.querySelector('#openShop'),
            closeBtn: document.querySelector('#closeShop'),
            modal: document.querySelector('#shopModal'),
            // itemsContainer: document.querySelector('#shopItemsContainer'),
            itemsContainer: document.querySelector('.items-shop'),
            shopSearchBar: document.querySelector('#shopSearch'),
            shopCategories: document.querySelectorAll('[data-category="shop"]'),
            quickBuy: document.querySelector('#quickBuy'),

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

    getWiresElements() {
        return {
            openBtn: document.querySelector('#openWires'),
            closeBtn: document.querySelector('#closeWires'),
            modal: document.querySelector('#wiresModal'),
            portsContainer: document.querySelector('#portsContainer'),
            portsGroupLabel: document.querySelector('#portSubhead'),
            pageRightBtn: document.querySelector('#portRight'),
            pageLeftBtn: document.querySelector('#portLeft')
            
        } || null
    }

    getDrawerElements() {
        return {
            modal: document.querySelector('#wiresDrawer'),
            cableContainer: document.querySelector('#cableContainer'),
            pullBtn: document.querySelector('#pulley')
        
        } || null
    }

    getDisplayAreaElements() {
        return {
            leftBtn: document.querySelector('#left'),
            rightBtn: document.querySelector('#right'),
            compLabel: document.querySelector('#compLabel'),
            compName: document.querySelector('#compName'),
            panelIndicator: document.querySelector('#panelIndicator'),
            menuButton: document.querySelector('[data-type="menu"]'),
            tabButtons: document.querySelectorAll('[data-type="tab"]')
        } || null
    }

    getItemInfoElements() {
        return {
            modal: document.querySelector('#itemInfoModal'),
            imageContainer: document.querySelector('#itemInfoImage'),
            infoName: document.querySelector('#itemInfoName'),
            specsContainer: document.querySelector('#itemInfoSpecs'),
            btn1: document.querySelector('#button1'),
            btn2: document.querySelector('#button2'),
        }
    }
    
    getAssistantElements() {
        return {
            container: document.querySelector('.assistant-container') ,
            imageContainer: document.querySelector('.assistant-image-container') , 
            pulse: document.querySelector('#pulse') ,
            image: document.querySelector('.assistant-image') ,
            infoContainer: document.querySelector('.assistant-info-container') ,
            modal: document.querySelector('.assistant-modal') ,
        } 
    } 
    
    getBootUpTabElements() {
        return {
            modal: document.querySelector('#bootUpTab'),
            openBtn: document.querySelector('#openBootTab'),
            closeBtn: document.querySelector('#closeBootTab'),
            powerBtn: document.querySelector('#powerButton'),
            pcPlaceHolder: document.querySelector('#unitPlaceHolder'),
            reportArea: document.querySelector('#bootTabReport')
        } || null
    }

    gettsimulation() {
        return {
            modal: document.querySelector('#troubleshootingModal'),
            closeBtn: document.querySelector('#close-troubleshooting'),
            errorList: document.querySelector('#error-list'),
            fixAllBtn: document.querySelector('#fix-all-btn'),
        } || null
    }


    getPcSetElements  
}

export default ElementHandler