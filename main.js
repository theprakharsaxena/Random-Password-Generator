const lengthSlider=document.querySelector(".pass-length input");
const generateBtn=document.querySelector(".generate-btn")
const options=document.querySelectorAll(".option input")
const passwordInput=document.querySelector(".input-box input")
const passIndicator=document.querySelector(".pass-indicator")
const copyIcon=document.querySelector(".input-box span")



const characters={
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:"0123456789",
    symbols:"~!@#$%^&*()_+{}|:<>?-=[]\/"
}

const generatePassword=()=>{
    let staticPassword="";
    let randomPassword="";
    let passLength=lengthSlider.value;
    let excludeDuplicate=false;
    
    options.forEach(option => {
        if(option.checked){
            if (option.id !== "exc-duplicate" && option.id !=="spaces") {
                staticPassword+=characters[option.id];
            }
            else if (option.id === "spaces") {
                staticPassword+=` ${staticPassword} `;
            }
            else{
                excludeDuplicate=true;
            }
        }
    });

    for (let index = 0; index < passLength; index++) {
        let randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)];
        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == "" ? randomPassword+=randomChar : index-1;
        }
        else{
            randomPassword+=randomChar;
        }
    }

    passwordInput.value=randomPassword;  
    copyIcon.innerText="copy_all"

}

const updatePassIndicator=()=>{
    // passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
    passIndicator.id = lengthSlider.value <= 6 ? "low" : lengthSlider.value <= 12 ? "weak" : lengthSlider.value <= 18 ? "medium" : lengthSlider.value <= 24 ? "strong" : "bold";
}

const updateSlider=()=>{
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
    copyIcon.innerText="copy_all"
}

updateSlider();

const copyPassword=()=>{
    navigator.clipboard.writeText(passwordInput.value);
    console.log(navigator.clipboard);
    copyIcon.innerText="check";

}

lengthSlider.addEventListener("input",updateSlider);
generateBtn.addEventListener("click",generatePassword);
copyIcon.addEventListener("click",copyPassword);