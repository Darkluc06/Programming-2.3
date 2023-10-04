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

class Header {
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




class BankyMain {
    placeToRenderMain;
    mainElement;
    leftSection;
    rightSection


    constructor(placeToRenderMain) {
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement, this);

    }

    makeButtonsFromData(data) {
        this.rightSection.makeButtonsFromData(data);
    }

    makeTransactionsFromData(data) {
        this.leftSection.makeTransactionsFromData(Object.entries(data)[0][0],data);
    }

    callFromRightSection(account , data){
        this.leftSection.makeTransactionsFromData(account,data);
    }

    render() {
        //main
        this.placeToRenderMain.appendChild(this.mainElement);

        this.leftSection.render();
        this.rightSection.render()
    }
}


class BankyLeftSection {
    mainElement
    constructor(mainElement) {
        this.mainElement = mainElement
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

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";
        this.eyeButton.onclick = this.eyeButtonClicked;

        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList = "banky__eye";

        this.eyeI = document.createElement("i");
        this.eyeI.classList = "fa-solid fa-eye";
        this.eyeI.idList =

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";

        

        this.transferButton = document.createElement("button");
        this.transferButton.classList = "banky__transferButton";
        this.transferButton.innerText = "Overboeken";
    }

    makeTransactionsFromData(accountToShow, data) {
        let totalMoney = 0;
        this.transactionsElement.innerHTML = "";
        for(let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amount"];
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction"

            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name";
            this.transactionFrom.innerText = data[accountToShow][i]["from/to"];

            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount";
            this.transactionAmount.innerText = data[accountToShow][i]["amount"];

            this.transactionsElement.appendChild(this.transactionElement)
            this.transactionElement.appendChild(this.transactionFrom)
            this.transactionElement.appendChild(this.transactionAmount)
            
        }
        this.bankyLogoText.innerText = "saldo €" + totalMoney;
    }

    eyeButtonClicked = () =>{
        this.transactionsElement.classList.toggle("banky__transactions--blur")
        this.bankyLogoText.classList.toggle("banky__money--blur")
    }

    render() {
        //left
        this.mainElement.appendChild(this.leftSectionElement);
        //header
        this.leftSectionElement.appendChild(this.bankyHeader);
        this.bankyHeader.appendChild(this.bankyHeaderWrapElement);




        //logo
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoText);

        
        //eye
        this.bankyHeaderWrapElement.appendChild(this.eyeButton);
        this.eyeButton.appendChild(this.eyeFigure);
        this.eyeFigure.appendChild(this.eyeI);


        //transactions
        this.leftSectionElement.appendChild(this.transactionsElement);
        
        this.leftSectionElement.appendChild(this.transferButton)
    }
}

class BankyRightSection {
    mainElement
    bankyMain;
    constructor(mainElement, bankyMain) {
        this.mainElement = mainElement;
        this.bankyMain = bankyMain;
        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section banky__section--right";

        this.accounts = document.createElement("ul");
        this.accounts.classList = "banky__accounts";


    }

    makeButtonsFromData(data) {
        Object.entries(data).forEach((entry) => {
            this.mainAccount = document.createElement("li");
            this.mainAccount.classList = "banky__account";
            
            this.mainAccount.onclick = () => {
                this.bankyMain.callFromRightSection(entry[0] ,data)
            }
            this.bankButton = document.createElement("button");
            this.bankButton.classList = "banky__switchAccount"

            this.bankButtonFigure = document.createElement("figure");
            this.bankButtonFigure.classList = "banky__logo";

            this.houseIcon = document.createElement("i");
            this.houseIcon.classList = data[entry[0]][0]["logo"]

            this.bankTitle = document.createElement("h4");
            this.bankTitle.classList = "banky__nameOfAccount";
            this.bankTitle.innerText = entry[0];

            this.accounts.appendChild(this.mainAccount)

            this.accounts.appendChild(this.mainAccount);
            this.mainAccount.appendChild(this.bankButton);
            this.bankButton.appendChild(this.bankButtonFigure);
            this.bankButtonFigure.appendChild(this.houseIcon);
            this.mainAccount.appendChild(this.bankTitle);
        })
    }

    

    render() {
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.accounts);
    }
}

class App {
    bankyHeader;
    bankyMain;
    getDataFromApi;
    constructor() {
        this.header = new Header("body")
        this.bankyMain = new BankyMain("body");

        this.getDataFromApi = new GetData("./data/transactions.json")
        this.getDataFromApi
            .getJson().then((data) => {
                this.bankyMain.makeButtonsFromData(data);
                this.bankyMain.makeTransactionsFromData(data);
            });

        this.header.render();
        this.bankyMain.render();
    }
}


const app = new App()