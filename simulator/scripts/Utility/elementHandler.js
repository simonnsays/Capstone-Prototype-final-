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
            // display ui elements
            leftBtn: document.querySelector('#left'),
            rightBtn: document.querySelector('#right'),
            compLabel: document.querySelector('#compLabel'),
            compName: document.querySelector('#compName'),
            panelIndicator: document.querySelector('#panelIndicator'),
            // ui button elements
            menuButton: document.querySelector('[data-type="menu"]'),
            tabButtons: document.querySelectorAll('[data-type="button"]'),
            mountToggle: document.querySelector('#mountUnmount'),
            // trash bin elements
            trashBin: document.querySelector('#trashBin'),
            trashDialog: document.querySelector('#trashConfrimDialog'),
            trashConfirm: document.querySelector('#trashConfirm'),
            trashReturn: document.querySelector('#trashReturn'),
            trashClose: document.querySelector('#trashClose')
            
            
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
        } || null
    }
    

    getAssistantElements() {
        return {
            image: document.querySelector('.assistant-image') ,
            // mini assistant elements
            assistantMini: document.querySelector('#assistantMini') ,
            iconSec: document.querySelector('.icon-section') , 
            pulse: document.querySelector('.pulse') ,
            infoSec: document.querySelector('.info-section') ,
            // full assistant elements
            assistantFull: document.querySelector('#assistantFull') ,
            modalIconArea: document.querySelector('.icon-area'),
            modalBody: document.querySelector('.asst-body'),
            tasksBtn: document.querySelector('#tasksButton'),
            errorsBtn: document.querySelector('#errorsButton'),
            tasksContainer: document.querySelector('#tasksContainer'),
            errorsContainer: document.querySelector('#errorsContainer'),
        } 
    } 
    
    getBootUpTabElements() {
        return {
            modal: document.querySelector('#bootUpTab'),
            openBtn: document.querySelector('#openBootTab'),
            closeBtn: document.querySelector('#closeBootTab'),
            powerBtn: document.querySelector('#powerButton'),
            pcPlaceHolder: document.querySelector('#unitPlaceHolder'),
            reportArea: document.querySelector('#bootTabReport'),
            closeErrorDialogBtn: document.querySelector('#closeErrorDialogBtn'),
            troubleshootBtn: document.querySelector('#troubleshootBtn'),
            errorMessage: document.querySelector('#errorMessage')
        } || null
    }


    getPcSetElements  
}

export default ElementHandler