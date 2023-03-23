class GetData {
    url;
    data = null;
    constructor(newUrl) {
        this.url = newUrl
    }
    async getJson() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.data = data
            });
        return this.data;
    }
}

// const api = new GetData("../data/transactions.json");
// api.getJson().then(function (data) { console.log(data) });


class Header {
    headerElement;
    divEmptyElement;
    divTitleElement;
    figureElement;
    logoIElement;
    logoHeadingElement;
    avatarWrapperElement;
    avatarElement;
    avatarHeadElement;
    avatarBodyElement;
    placeToRenderHeader;
    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];

        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.divEmptyElement = document.createElement("div");
        this.divEmptyElement.classList = "header__empty"

        this.divTitleElement = document.createElement("div");
        this.divTitleElement.classList = "header__title"

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIElement = document.createElement("i");
        this.logoIElement.classList = "fa-solid fa-credit-card";

        this.logoHeadingElement = document.createElement("h2");
        this.logoHeadingElement.classList = "header__banky";
        this.logoHeadingElement.innerText = "Banky"

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "header__avatarWrapper";

        this.avatarElement = document.createElement("figure");
        this.avatarElement.classList = "avatar";

        this.avatarHeadElement = document.createElement("div");
        this.avatarHeadElement.classList = "avatar__head";

        this.avatarBodyElement = document.createElement("div");
        this.avatarBodyElement.classList = "avatar__body";


        //     <header class="header">
        //     <div class="header__empty">

        //     </div>

        //     <div class="header__title">

        //         <figure class="header__logo">

        //             <i class="fa-solid fa-credit-card"></i>
        //             <h2 class="header__banky">Banky</h2>

        //         </figure>

        //     </div>

        //     <div class="header__avatarWrapper">
        //         <figure class="avatar">
        //             <div class="avatar__head"></div>
        //             <div class="avatar__body"></div>
        //         </figure>
        //     </div>

        // </header>

    }

    render() {
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.divEmptyElement);


        this.headerElement.appendChild(this.divTitleElement);

        this.divTitleElement.appendChild(this.figureElement);

        this.figureElement.appendChild(this.logoIElement);
        this.figureElement.appendChild(this.logoHeadingElement);


        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarElement);
        this.avatarElement.appendChild(this.avatarHeadElement);
        this.avatarElement.appendChild(this.avatarBodyElement);
    }
}

const header = new Header("body")
header.render()



class BankyMain {
    placeToRenderMain;
    mainElement
    leftSectionElement
    bankyHeader
    bankyLogoElement
    bankyLogoIElement
    bankyLogoText
    eyeButton
    eyeFigure
    eyeI
    transactionsElement
    transactionElement
    transactionFrom
    transactionAmount
    transferButton

    constructor(placeToRenderMain) {
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left";

        this.bankyHeader = document.createElement("header");
        this.bankyHeader.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";
        this.bankyLogoText.innerText = "Saldo"

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";

        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList = "banky__eye";

        this.eyeI = document.createElement("i");
        this.eyeI.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";

        this.transactionElement = document.createElement("li");
        this.transactionElement.classList = "banky__transaction"

        this.transactionFrom = document.createElement("h3");
        this.transactionFrom.classList = "banky__name";
        this.transactionFrom.innerText = "Jeroen";

        this.transactionAmount = document.createElement("h3");
        this.transactionAmount.classList = "banky__amount";
        this.transactionAmount.innerText = "+$10";

        this.transferButton = document.createElement("button");
        this.transferButton.classList = "banky__transferButton";
        this.transferButton.innerText = "Overboeken";

        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section banky__section--right";

        this.bankyAccounts = document.createElement("ul");
        this.bankyAccounts.classList = "banky__accounts";
        
        this.bankyMainAccount = document.createElement("li");
        this.bankyMainAccount.classList = "banky__account";

        
    }

    render(){
        this.placeToRenderMain.appendChild(this.mainElement);
        this.mainElement.appendChild(this.leftSectionElement);
        this.leftSectionElement.appendChild(this.bankyHeader);
        this.bankyHeader.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoText);
        this.bankyHeaderWrapElement.appendChild(this.eyeButton);

        this.eyeButton.appendChild(this.eyeFigure);
        this.eyeFigure.appendChild(this.eyeI);
        this.leftSectionElement.appendChild(this.transactionsElement);
        this.transactionsElement.appendChild(this.transactionElement)
        this.transactionElement.appendChild(this.transactionFrom)
        this.transactionElement.appendChild(this.transactionAmount)

        this.leftSectionElement.appendChild(this.transferButton)

        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.bankyAccounts)

        this.bankyAccounts.appendChild(this.bankyMainAccount)
        
    }
}


const main = new BankyMain("body");
main.render();