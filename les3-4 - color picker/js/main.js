//begint de class van de li en all zijn inhoud hierin zit ook de functie die de kaarten rendert en zorgt voor dat de onclick functie nog werkt
class ColorCard{

    //property list
    id;
    color;
    addToList;
    htmlElement;
    circle;
    text;
    //

    //constructor aan roepen deze neemt van buiten de class een id(cijfer van hoeveelste kaart het is) een kleur en de id van het element;
    constructor(NewId, NewColor, AddToList){
        /* settings properties */

        // neemt de constructor attributen en zet ze in een this variable
        this.id = NewId;
        this.color = NewColor;
        this.addToList = AddToList;
        //

        // creeërt de li
        this.htmlElement = document.createElement("li")
        // voegt de class toe aan de li
        this.htmlElement.classList = "colors__color"
        

        //maakt de figure aan met de naam circle
        this.circle = document.createElement("figure");
        //voegt de class van de figure toe
        this.circle.classList = "colors__circle";

        //voegt de kleur die we in de constructor hebben meegegeven toe
        this.circle.style.background = this.color;
        
        //maakt de paragraag aan waar copied in komt te staan
        this.text = document.createElement("p");
        //zet copied daadwerkelijk neer
        this.text.innerText = "copied"
        //geeft de class van de text mee
        this.text.classList = "colors__text";
        
        //roept de onclick functie aan
        this.htmlElement.onclick = this.onHTMLElementClicked;

        //roept de render functie aan
        this.render();
    }

    //maakt de onclick arrow functie
    onHTMLElementClicked = () =>{
        //voegt de selected modifier toe die ervoor zorgt dat de circle vierkant wordt en copied vertoont
        this.circle.classList.add("colors__circle--selected");
        //voegt de kleur naar de window titel toe als je op de kleur klikt
        document.title = this.color;
        //zet die zelfde kleur op je clipboard
        window.navigator.clipboard.writeText(this.color);
    }

    //maakt de render functie aan
    render(){
        //zet alle elementen in de juiste volgorde
        //eerst de li in de ul
        this.addToList.appendChild(this.htmlElement);  
        //daarna de circle en de text in de li
        this.htmlElement.appendChild(this.circle);
        this.htmlElement.appendChild(this.text);
        //
    }
}



//deze class maakt de ul aan en rendert deze consequent ook
class ColorList{
    //property list
    id;
    htmlElement;
    //


    //consttructor die alleen de id oproept van buiten de functie
    constructor(newId){
        this.id = newId;
        //maakt de ul aan
        this.htmlElement = document.createElement("ul");
        //geeft de ul de id van buiten
        this.htmlElement.id = this.id;
        //geeft de ul een class
        this.htmlElement.classList = "colors";
        //roept de render fucntie aan
        this.render();
    }
    
    //maakt de render functie
    render(){
        //vraagt de body op en voegt de ul toe aan deze als child
        document.querySelector("body").appendChild(this.htmlElement);
        
    }
}



//deze class creeërt de getallen voor de kleur
class HSLGenerator{
    //property list
    randomHUE;
    randomSaturation;
    randomLightness;
    hsl;
    //

    //deze constructor roept alleen een functie aan
    constructor(){
        this.generateHSL();  
    }

    //maakt de random hue aan tussen 1 en 360
    generateHue = function(){
        this.randomHUE = Math.floor(Math.random() * (360 - 1) + 1);
    }

    //maakt de random saturation aan tussen 11 en 79
    generateSaturation = function(){
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%";
    }

    //maakt de random lightness aan tussen 90 en 11
    generateLightness = function(){
        this.randomLightness = Math.floor(Math.random() * (90 - 11) + 11) + "%";
    }

    //deze functie roept alle drie vorige aan 
    generateHSL = function(){
        this.generateHue();
        this.generateSaturation();
        this.generateLightness();
        //zet alle getallen in de juiste volgorde en in de varible this.hsl
        this.hsl = `hsl(${this.randomHUE}, ${this.randomSaturation}, ${this.randomLightness})`;
    }
}


//deze class is de start en laat alle andere classes lopen
class App{
    //property list
    id;
    colorList;
    generator;
    //

    //deze constructor heeft 1 attributen(van buiten een id). 
    //de constructor roept de andere classes aan
    constructor(newId){
        //attribute
        this.id = newId
        //classes
        this.colorList = new ColorList(this.id);
        this.generator = new HSLGenerator();

        //roept de functie aan die de for loop als inhoud heeft
        this.generateColorCards();
    }

    //deze functie heeft een for loop die ervoor zorgt dat de li 100x aan gemaakt wordt
    generateColorCards = function(){
        //de for loop van 1 tot 101 oftewel 100 getallen startend van 1
        for(let i = 1; i < 101; i++){
            //roept de kleur generator aan zodat deze 100x over kan gebeuren met gevolg dat elke li een andere kleur heeft
            this.generator.generateHSL();
            //maakt hiermee 100 li's
            new ColorCard(i, this.generator.hsl, document.getElementById(this.colorList.id));
        }
    }
}


//roept de laatste setup class aan
const app = new App("js--colors");

