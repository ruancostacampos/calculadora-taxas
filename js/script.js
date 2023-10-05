const taxes = [4.5, 5.8, 6.8, 7.8, 8.8, 9.8, 10.5, 11.5, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 17, 18];

let loanValue = document.getElementById('loanValue');
let parcel = document.getElementById('parcel');
let result = document.getElementById('result');
let checkbox = document.getElementById('checkbox');



getLoanText = () => {
    return (parseFloat(loanValue.value.replace(/\D/g, '')) / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const validateNumber = (input) => {
    

    if(input.value == NaN || input.value == ''){
        input.value = 0
    }

    input.value = getLoanText()

    calculateTax();
}



const calculateTax = () => {
    
    //Catch the R$ 1.000 string into a float value: 1000
    let loanValueFloat = parseFloat(loanValue.value.replace(/\D/g, '')) / 100;
    
    //Pick the tax according to selected parcel
    let currentTax = taxes[parcel.value - 1];

    let calculatedTax = loanValueFloat - ( (loanValueFloat * currentTax) / 100);

    // If you want to repass the taxes to the client
    if(checkbox.checked == true){
       //Calculate the tax
       calculatedTax = loanValueFloat / (1 - (currentTax/100));
       //Transform the float value to R$1.000
       calculatedTax = calculatedTax.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
       result.innerHTML = `Ao passar <em>${calculatedTax}</em> você recebe <em>${getLoanText()}</em>`;
       return
    }

    if(checkbox.checked == false){
        calculatedTax = calculatedTax.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        result.innerHTML= `Será cobrado <em>${getLoanText()}</em> e receberá <em>${calculatedTax}<em>`;
    }

   
}

calculateTax();
validateNumber(loanValue);