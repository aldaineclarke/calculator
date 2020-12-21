"use strict";
let buttons = document.querySelectorAll(".calculator-buttons span");
let screen = document.querySelector("#calculator-screen");
const expression =  document.querySelector(".expression span");
const result =  document.querySelector(".result span");
let val;
let memory;
let array_eval = [];


let clickEffect = document.querySelector("audio");



buttons.forEach((btn)=>{
    btn.addEventListener("click",(event)=>{
        clickEffect.play();
        btn.style.backgroundColor = "teal";
        btn.style.fontColor = "rgb(255, 187, 0)";
      
        setTimeout(()=>{
        btn.style.fontColor = "teal";
        btn.style.backgroundColor = "rgb(255, 187, 0)";
        },100);

        if (event.target.id ==="on-btn"){
            powerOn();
            
        }
        if (event.target.id ==="off-btn"){
            powerOff();
            
        }
        if(event.target.classList.contains("digit") || event.target.classList.contains("operator")){
            
            if (isOn()){
                val = event.target.innerText;
                if (expression.innerText.endsWith("=") && event.target.classList.contains("operator")){
                    array_eval.push(memory);
                    expression.innerText = "ANS";
                }else if(expression.innerText.endsWith("=") && event.target.classList.contains("digit")){
                    expression.innerText = "";
                }
                expression.innerText += `${val}`;
              
                if (val === "x"){
                    val = "*";
                }
                if (val === "÷"){
                    val = "/";
                }
                array_eval.push(val);  
            
            }
            
        }if (event.target.id === "sqrt" && isOn()){
            if (array_eval.length > 0 ) {
                console.log(array_eval);
                let digits = arrayToString(array_eval);
                console.log(digits);
                result.innerText = evaluate(`Math.sqrt(${digits})`);
            }else if(memory){
                result.innerText = evaluate(`Math.sqrt(${memory})`)
                console.log("yep its working")
            }
        }if(event.target.id == "evaluate" && isOn()){           
            expression.innerText+="=";
            result.innerText = evaluate(arrayToString(array_eval));

        }
        if (event.target.id == "neg_pos" && isOn()){
            encaseWithBracket();
            

        }if(event.target.classList.contains("func-button") && isOn()){

            if (event.target.id == "mem+"){
                array_eval = [];
                array_eval.push(memory,"+");
                expression.innerText = "ANS+";


            }
            if (event.target.id == "mem-"){
                array_eval = [];
                array_eval.push(memory,"-");
                expression.innerText = "ANS-";

            }

            if(event.target.id == "clear"){
                console.log(array_eval)
                array_eval.pop();
                expression.innerText = arrayToString(array_eval);
                console.log("this is in the ",expression.innerText);
            }
            
        }

    });



});

function powerOff(){
    if(isOn()){
        result.innerText = "";
        expression.innerText ="" ;
        screen.classList.remove("active");
        return ;
    }else{
        return false;
    }
}
function powerOn(){
    memory = "";
    if(isOff()){
        screen.classList.add("active");
    }else if(isOn()){
        expression.innerText = "";
    }
    result.innerText = "0";

}
function evaluate(expression){
    let raw_result;
    try {
        raw_result = eval(expression);
        array_eval = [];
    } catch (error) {
        return "SYNTAX ERROR";
    }
    if (raw_result === undefined || raw_result === NaN){
        return "ERROR"
    }else if (`${raw_result}`.length >= 10){
        return "OVERFLOW";
    }else{
        memory = raw_result;
        return raw_result;

    }

}
function isOn(){
    // since there is only one statement for each condition..I could simply just remove the braces and place them on one line.
    if (screen.classList.contains("active")) return true;
    else return false;
    }

function isOff(){
    // since there is only one statement for each condition..I could simply just remove the braces and place them on one line.
    if (screen.classList.contains("active")) return false;
    else return true;
    }

function encaseWithBracket(){
    let exp = array_eval.pop();
    if (eval(exp) >= 0 ) array_eval.push(`-${exp}`);
    else array_eval.push(`${exp}`)
    expression.innerText = arrayToString(array_eval);
}

function arrayToString(array){
    let stringV ="" ;
    if (array == null){
        stringV = "";

    }else{
        array.forEach((val)=>{
            stringV+=`${val}`;

        });
    }
    return stringV;
}