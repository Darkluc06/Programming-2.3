class Cookie {
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    constructor(newName, newHtmlElement, newScore) {
        this.name = newName;
        this.htmlElement = newHtmlElement;
        this.htmlElement.onclick = this.onCookieClick;
        this.score = newScore;
    }

    onCookieClick = () => {
        this.score.onCookieClick(this.factor);

    }
    onStyleChangedChoco = () => {
        this.htmlElement.classList.add("cookie--chocolate");
    }
    onStyleChangedVelvet = () => {
        this.htmlElement.classList.add("cookie--velvet");
    }
    removeStyleChangedChoco = () => {
        this.htmlElement.classList.remove("cookie--chocolate");
    }
    removeStyleChangeVelvet = () => {
        this.htmlElement.classList.remove("cookie--velvet")
    }
}

class Score {
    name = "";
    score;
    htmlElement = undefined;
    constructor(newName, newScore, newHtmlElement) {
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHtmlElement;
        this.htmlElement.innerHTML = newScore;
    }
    onCookieClick = (factorFromCookie) => {
        this.score += factorFromCookie;
        this.htmlElement.innerText = this.score;
    }
    subtractScore() {
        this.score -= 100;
        this.htmlElement.innerText = this.score
    }
    onAutoScoreClicked() {
        setInterval(() => {
            this.score += 500;
            this.htmlElement.innerText = this.score
        }, 10000)
    }
    addPointsChoco() {
        this.score += 10000;
        this.htmlElement.innerText = this.score
    }
    addPointsVelvet() {
        this.score += 50000;
        this.htmlElement.innerText = this.score
    }

    scoreLoaded(newScore) {
        this.score = newScore

        this.htmlElement.innerText = this.score;
    }
}

class Multiplier {
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought;
    score;
    constructor(newHtmlElement, newCookie, newScore) {
        this.htmlElement = newHtmlElement;
        this.score = newScore;
        this.htmlElement.onclick = this.onMultiplierClick
        this.cookie = newCookie;

    }

    onMultiplierClick = () => {
        if (this.bought === true || window.localStorage.getItem("multBought") === "true" || this.score.score <= 100) {
            return;
        }
        this.bought = true;
        this.cookie.score.subtractScore();
        this.cookie.factor = this.factor;
    }
}

class AutoScore {
    htmlElement = undefined;
    score = undefined;
    bought;
    constructor(newHtmlElement, newScore) {
        this.htmlElement = newHtmlElement;
        this.score = newScore;
        this.htmlElement.onclick = this.onAutoScoreClicked;
    }
    onAutoScoreClicked = () => {
        if (this.bought === true || window.localStorage.getItem("autoBought") === "true" || this.score.score <= 100) {
            return;
        }
        this.bought = true;
        this.score.subtractScore();
        this.score.onAutoScoreClicked();
    }
}

class ChocolateCookie {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;
    pointsAquired = false;
    constructor(newHtmlElement, newCookie) {
        this.htmlElement = newHtmlElement;
        this.cookie = newCookie
        this.htmlElement.onclick = this.onChocolateCookieClicked;
    }
    onChocolateCookieClicked = () => {
        if (this.bought === false) {
            this.bought = true
            this.cookie.removeStyleChangeVelvet();
            this.cookie.onStyleChangedChoco();
            redVelvet.bought = false;
            if (this.pointsAquired === false && window.localStorage.getItem("chocolateCookie") !== "true") {
                this.pointsAquired = true;
                this.cookie.score.addPointsChoco();
            }
        }
        else {
            this.bought = false;
            this.cookie.removeStyleChangedChoco();
        }
    }
}

class RedVelvet {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;
    pointsAquired = false;
    constructor(newHtmlElement, newCookie) {
        this.htmlElement = newHtmlElement;
        this.cookie = newCookie;
        this.htmlElement.onclick = this.onRedVelvetClicked;
    }

    onRedVelvetClicked = () => {
        if (this.bought === false) {
            this.bought = true
            this.cookie.removeStyleChangedChoco();
            this.cookie.onStyleChangedVelvet();
            choco.bought = false;
            if (this.pointsAquired === false && window.localStorage.getItem("redVelvet") !== "true") {
                this.pointsAquired = true;
                this.cookie.score.addPointsVelvet();
            }
        }
        else {
            this.bought = false;
            this.cookie.removeStyleChangeVelvet();
        }
    }
}

class Save {
    htmlElement;
    score;
    chocolateCookie;
    redVelvet;
    multiplier;
    AutoScore;

    constructor(newHtmlElement, newScore, newChoco, newRed, newMult, newAuto) {
        this.htmlElement = newHtmlElement;
        this.score = newScore;
        this.chocolateCookie = newChoco
        this.redVelvet = newRed;
        this.multiplier = newMult;
        this.autoscore = newAuto;
        this.htmlElement.onclick = this.onSaveButtonClicked;

    }

    onSaveButtonClicked = () => {
        window.localStorage.setItem("score", this.score.score);
        if (window.localStorage.getItem("multBought") !== "true") {
            window.localStorage.setItem("multBought", this.multiplier.bought);
        }
        if (window.localStorage.getItem("autoBought") !== "true") {
            window.localStorage.setItem("autoBought", this.autoscore.bought);
        }
        if (window.localStorage.getItem("chocolateCookie") !== "true") {
            window.localStorage.setItem("chocolateCookie", this.chocolateCookie.pointsAquired);
        }
        if (window.localStorage.getItem("redVelvet") !== "true") {
            window.localStorage.setItem("redVelvet", this.redVelvet.pointsAquired);
        }
    }
}


class Load {
    score;
    cookie

    constructor(newScore, newCookie) {
        this.score = newScore;
        this.cookie = newCookie;
        this.onLoadScore();
        this.onLoadMult();
        this.onLoadAuto();
    }

    setScore = function () {
        this.score.score = 0;
        this.score.htmlElement.innerText = this.score.score;
    }

    onLoadScore = function () {
        const scoreFromLocalStorage = parseInt(window.localStorage.getItem("score"));
        if (Number.isInteger(scoreFromLocalStorage) === true) {
            this.score.scoreLoaded(scoreFromLocalStorage);
            return
        }
        this.setScore();
    }

    onLoadMult = function () {
        if (window.localStorage.getItem("multBought") === "true") {
            this.cookie.factor = 100
        }
    }

    onLoadAuto = function () {
        if (window.localStorage.getItem("autoBought") === "true") {
            this.score.onAutoScoreClicked();
        }
    }
}



//setup for score and cookie
const score = new Score("score", 1, document.getElementById("js--score"));
const cookie = new Cookie("cookie", document.getElementById("js--cookie"), score);

//setup desktop games
const multiplier = new Multiplier(document.getElementById("js--multiplier"), cookie, score);
const auto = new AutoScore(document.getElementById("js--autoScore"), score)
const choco = new ChocolateCookie(document.getElementById("js--choco"), cookie);
const redVelvet = new RedVelvet(document.getElementById("js--velvet"), cookie)
const save = new Save(document.getElementById("js--saveButton"), score, choco, redVelvet, multiplier, auto);
const load = new Load(score, cookie);

//setup mobile games
const multiplierMobile = new Multiplier(document.getElementById("js--multiplier--mobile"), cookie);
const autoMobile = new AutoScore(document.getElementById("js--autoScore--mobile"), score);
const chocoMobile = new ChocolateCookie(document.getElementById("js--choco--mobile"), cookie);
const velvetMobile = new RedVelvet(document.getElementById("js--velvet--mobile"), cookie);