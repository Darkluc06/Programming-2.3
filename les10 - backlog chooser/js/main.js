class GetData {
    data = null
    async getData() {
        await fetch("./data/games.json")
            .then((response) => {
                return response.json();
            })
            .then((newData) => {
                this.data = newData.games
            })
        return this.data
    }
}

class Filter {
    filteredResult = [];
    filter(platform, data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].platform === platform) {
                this.filteredResult.push(data[i])
            }
        }
    }
    randomFromResult() {
        let randomNumber = Math.floor(Math.random() * this.filteredResult.length)
        return this.filteredResult[randomNumber]
    }
}

class URLScraper {
    currentURL;
    paltform;
    pretty
    constructor() {
        this.currentURL = window.location.href;

    }
    getDataFromURL() {
        this.platform = this.currentURL.split("platform=")[1]
        this.pretty = new PrettyPlatform(this.platform);
        this.platform = this.pretty.platform
        console.log(window.location.href.split("platform="))
    }
}

class PrettyPlatform {
    platform;

    constructor(platform) {
        this.platform = platform
        this.platformToUpperCase();
        this.removeSpaces();
    }

    platformToUpperCase() {
        this.platform = this.platform.toUpperCase()
    }

    removeSpaces() {
        this.platform = this.platform.replaceAll(" ", "")
        this.platform = this.platform.replaceAll("%20", "")
    }
}

class Render {
    articleToBeRendered;
    headingToBeRendered;
    randomResult
    constructor(randomFromResult) {
        this.randomResult = randomFromResult

        this.articleToBeRendered = document.createElement("article");
        this.articleToBeRendered.classList = "card" 
        
        this.headingToBeRendered = document.createElement("h1");
        this.headingToBeRendered.classList = "card__heading"
        
    }
    render(randomResult) {
        document.getElementsByTagName("body")[0].appendChild(this.articleToBeRendered);
        this.articleToBeRendered.appendChild(this.headingToBeRendered)
        this.headingToBeRendered.innerText = randomResult["title"];
    }
}

class App {
    getData;
    filter;
    urlScraper
    render
    constructor() {
        this.getData = new GetData();
        this.filter = new Filter();
        this.urlScraper = new URLScraper();
        

        this.urlScraper.getDataFromURL();

        

        this.getData.getData().then((data) => {
            this.filter.filter(this.urlScraper.platform, data);

            //article > h1

            this.render = new Render();
            this.render.render(this.filter.randomFromResult())
        });
    }
}

const app = new App();