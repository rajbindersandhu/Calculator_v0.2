let numberString = "";
let memoryArray = [];
let backupString = "";
let temporaryBackup =[];
function onOff(){
    let displayOption = document.getElementById("cal-box");
    let temp = document.getElementById("tagName");
    if(displayOption.style.display == "none" ){
        displayOption.style.display = "block";
        temp.style.display = "none";
        document.getElementById("screen").innerHTML = "Enter your value";
        document.getElementById("memory-screen").innerHTML = " ";
    }
    else{
        displayOption.style.display = "none";  
        temp.style.display = "block";
        numberString ="";
        memoryArray =[];
        backupString = "";
    }
}
function numberClicked(value){
    if(value === '.' && !(/[.]/.test(numberString))){        
            numberString += value;
            numberString = parseFloat(numberString).toString();
    }
    else if(/[0-9]/.test(value)){
        if(numberString.length<=21){
            numberString += value;
            numberString = parseFloat(numberString).toString();
        }
        else{
            memoryArray =[];
            numberString = "";
            return document.getElementById("screen").innerHTML = "Out of range";
        }        
    }
    
    return document.getElementById("screen").innerHTML = numberString;
   
}

function operatorClicked(operator){
    let toBePrinted ="Enter value";
    
    if(memoryArray.length == 0 && numberString.length == 0){
        console.log("yes");
        return document.getElementById("screen").innerHTML =  "Use N for prefix";
    }
    else if(memoryArray.length == 0 && numberString.length > 0){
        
        memoryArray.push(numberString);
        if(parseFloat(numberString)<0){
            temporaryBackup.unshift("(");
            temporaryBackup.push(numberString);
            temporaryBackup.push(")");
        }
        else{
            temporaryBackup.push(numberString);
        }        
        memoryArray.push(operator);
        temporaryBackup.push(operator);
        backupString = temporaryBackup.join(" ");
        numberString = "";
    }
    else if(memoryArray.length == 1 && numberString.length == 0){
        memoryArray.push(operator);
        temporaryBackup.push(operator);
        backupString = temporaryBackup.join(" ");
    }
    else if(memoryArray.length > 0 && numberString.length > 0){
        let number1;
        if(parseFloat(numberString)<0){
            temporaryBackup.unshift("(");
            temporaryBackup.push(numberString);
            temporaryBackup.push(")");
        }
        else{
            temporaryBackup.push(numberString);
        } 
        temporaryBackup.unshift("(");
        temporaryBackup.push(")");
        temporaryBackup.push(operator);
        console.log(temporaryBackup);
        
        if(/[.]/.test(memoryArray[0])){
            number1 = parseFloat(memoryArray[0]);
        }
        else{
            number1 = parseInt(memoryArray[0]);
        }
        let addedOperator = memoryArray[1];
        let number2;
        if(/[.]/.test(numberString)){
            number2 = parseFloat(numberString);
        }
        else{
            number2 = parseInt(numberString);
        }
        let result;
        switch (addedOperator){
            case "+": result = number1 + number2;
            break;
            case "-": result = number1 - number2;
            break;
            case "*": result = number1 * number2;
            break;
            case "/": result = number1 / number2;
            break;
            case "%": result = number1 % number2;
            break;

        }
        memoryArray = [];
        if(result == "Infinity"){
            numberString = "";
            return document.getElementById("screen").innerHTML = "Infinity reached.....Can't go further";
        }
        else if(result.length > 21){
            numberString = "";
            return document.getElementById("screen").innerHTML = "Out of range";
        }
        memoryArray.push(result.toString());
        numberString = "";
        memoryArray.push(operator);
        backupString = temporaryBackup.join(" ");
    }
    let x = document.getElementById("memory-screen");
    x.innerHTML = backupString;
    return document.getElementById("screen").innerHTML =  toBePrinted; 
}

function addPrefix(){
    if(numberString.length == 0){
        numberString="-";
    }
}

function backSpace(){
    if(/^[A-Z]/.test(numberString) || numberString.length == 0){
        numberString ="";
        return document.getElementById("screen").innerHTML = "Enter value";
    }
    else{
        if(numberString.length>1){
            numberString = numberString.slice(0,-1);
        }
        else if(numberString.length==1){
            numberString="";
            return document.getElementById("screen").innerHTML = "Enter value"; 
        }
    }
    
    return document.getElementById("screen").innerHTML = numberString; 
}

function allClear(){
    numberString = "";
    backupString = "";
    temporaryBackup =[];
    memoryArray = [];
    let x = document.getElementById("memory-screen");
    x.innerHTML = " ";
    return document.getElementById("screen").innerHTML = "Enter value";
}

function showResult(){
    
    if(memoryArray.length >0 && numberString.length >0){
        console.log("yes");
        let number1;
        if(parseFloat(numberString)<0){
            temporaryBackup.push("(");
            temporaryBackup.push(numberString);
            temporaryBackup.push(")");
        }
        else{
            temporaryBackup.push(numberString);
        } 
        backupString = temporaryBackup.join(" ");
        if(/[.]/.test(memoryArray[0])){
            number1 = parseFloat(memoryArray[0]);
        }
        else{
            number1 = parseInt(memoryArray[0]);
        }
        let addedOperator = memoryArray[1];
        let number2;
        if(/[.]/.test(numberString)){
            number2 = parseFloat(numberString);
        }
        else{
            number2 = parseInt(numberString);
        }
        let result;
        switch (addedOperator){
            case "+": 
            result = number1 + number2;
            
            break;
            case "-": result = number1 - number2;
            break;
            case "*": result = number1 * number2;
            break;
            case "/": result = number1 / number2;
            break;
            case "%": result = number1 % number2;
            break;

        }
        
        memoryArray = [];
        if(result == "Infinity"){
            numberString = "";
            return document.getElementById("screen").innerHTML = "Infinity reached.....Can't go further";
        }
        else if(result.length > 20){
            numberString = "";
            return document.getElementById("screen").innerHTML = "Out of range";
        }
        memoryArray.push(result.toString());
        numberString = "";
        backupString += " =";
        let x = document.getElementById("memory-screen");
        x.innerHTML = backupString;
        temporaryBackup = [];
        backupString = ""; 
        temporaryBackup.push(result.toString());
        return document.getElementById("screen").innerHTML = memoryArray[0];

    }

}