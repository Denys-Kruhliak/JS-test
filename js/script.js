let elements = document.forms.burger.elements;
let size = elements.size;
let meat = elements.meat;

let add = elements.add;
let topp = elements.topp;
let calc = elements.calc;

let res = document.getElementById('res');

class Burger{
    priceBurger = 0;
    kcalBurger = 0;
    constructor(sizeBurger, addBurger,meatBurger){
        this.size = sizeBurger;
        this.meat = meatBurger;
        this.add = addBurger;//массив
        this.topp = null;//массив
    };
    static sizePrice = {large:100,  small:50};
    static sizeKcal =  {large:40,   small:20};
    static meatPrice = {chicken:20, pork:30,  beef:35};
    static meatKcal =  {chicken:30, pork:40,  beef:45};
    static addPrice =  {cheese:10,  salad:20, potato:15};
    static addKcal =   {cheese:20,  salad:5,  potato:10};
    static toppPrice = {mayonez:20, spice:15};
    static toppKcal =  {mayonez:5,  spice:0};
    static createBurger(){
        return new Burger('small','beef',['cheese','salad']);
    };
    setTopp(toppings){this.topp = toppings;}
    calcAdd(){
        let price = 0;
        let kcal = 0;
        for(let i=0; i<this.add.length; i++){
            price += Burger.addPrice[this.add[i]]
            kcal += Burger.addKcal[this.add[i]]
        };   
        return {addPr:price, addKc:kcal};
    }
    calcTopp(){
        let price = 0;
        let kcal = 0;
        for(let i=0; i<this.topp.length; i++){
            price += Burger.toppPrice[this.topp[i]]
            kcal += Burger.toppKcal[this.topp[i]]
        }; 
        return {toppPr:price, toppKc:kcal};
    }
    price(){
        this.priceBurger += Burger.sizePrice[this.size];
        console.log(this.size)
        this.priceBurger += Burger.meatPrice[this.meat];
        console.log(this.meat)
        this.priceBurger += this.calcAdd().addPr;
        if(this.topp){
            this.priceBurger += this.calcTopp().toppPr
        }
        return this.priceBurger;
    };
    kcal(){
        this.kcalBurger += Burger.sizeKcal[this.size];
        this.kcalBurger += Burger.meatKcal[this.meat]
        this.kcalBurger += this.calcAdd().addKc;
        if(this.topp){
            this.kcalBurger += this.calcTopp().toppKc
        }
        return this.kcalBurger;
    };
};

// const testBurger = Burger.createBurger();
// testBurger.setTopp(['spice'])
// res.innerHTML = testBurger.price() + ' грн. || ' + testBurger.kcal() + ' кКал';

calc.disabled = true
let count = 0 
for(let i=0;i<add.length;i++){
    add[i].addEventListener('click',()=>{
        count = 0
        for(let j = 0; j<add.length;j++){
            if(add[j].checked)count++;
        }
        if(count)calc.disabled = false
        else calc.disabled = true
    }) 
}

calc.addEventListener('click',(event)=>{
    event.preventDefault();
    let sizeValue = size.value;
    let meatValue = meat.value;
    let addValue = [];
    for(let i=0;i<add.length;i++){
        if(add[i].checked)addValue.push(add[i].value)
    }
    let toppValue = [];
    for(let i=0;i<topp.length;i++){
        if(topp[i].checked)toppValue.push(topp[i].value)
    }

    console.log(addValue)
    const burgerUser = new Burger(sizeValue,addValue,meatValue)
    if(toppValue.length) burgerUser.setTopp(toppValue)
    // burgerUser.setTopp()
    res.innerHTML = burgerUser.price() + ' грн. || ' + burgerUser.kcal() + ' кКал';
})