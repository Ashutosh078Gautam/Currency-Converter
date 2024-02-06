const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const select = document.querySelectorAll(".select-container select");
const btn = document.querySelector( "button" );
let fromCurrency= document.querySelector(" .from select");
let  toCurrency= document.querySelector( ".to select" ) ;
let display = document.querySelector( ".msg" );


for (let options of select){
  for(currencycode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText =  currencycode;
    newOption.value = currencycode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    options.append(newOption);
  }
  options.addEventListener('change', (event)=>{
    updateFlag(event.target)
  });

}



  const updateExchangeRate =  async ()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value; 
    if  (amtValue==""|| amtValue<1){
      amtValue = 1;
      amount.value="1";
      }
      let fromCurr= fromCurrency.value.toLowerCase();
      let toCurr= toCurrency.value.toLowerCase();
  
      const URL = `${BASE_URL}/${fromCurr}/${toCurr}.json`;
      let response =await fetch(URL);
      let data  = await response.json();
      let rate  = data[toCurr];
  
      let finalAmount = amtValue *  rate ;
      display.innerText = `${amtValue} ${fromCurr} = ${finalAmount} ${toCurr}`;
//console.log(`${amtValue} dollar* ${rate}rupees = ${finalAmount}rupees`);
  };

 


const updateFlag =(element)=>{
  let currencycode = element.value;
  let countrycode = countryList[currencycode];
  let imgurl = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src=imgurl;
};

btn.addEventListener( 'click' ,(e)=>{
  e.preventDefault();
  updateExchangeRate();
} ) ;



window.addEventListener("load",()=>{
  updateExchangeRate();
});