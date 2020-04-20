(function () {

    const palindrome = {
        palindrome_checker(text) {
            //if(typeof text !== "string") throw "Please provide a string";
            if(!text) throw "Please provide the text";
            var originalText = text.toLowerCase().replace(/[^\w]|_/g,"").replace(/\s+/g,"");
            var reversedText = originalText.split("").reverse().join("");

            if(originalText==reversedText) return true;
            else return false;
        },

        strip(text){
            
            var input = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i] >= 'A' && text[i] <= 'Z') {
                    temp = text[i].charCodeAt();
                    input += String.fromCharCode(temp + 32);
                }
                else if (text[i] >= 'a' && text[i] <= 'z') {
                    input += text[i];
                }
            }
          
            return input;
        
           //return text.toLowerCase().replace(/[^\w]|_/g,"").replace(/\s+/g,"");
        }
        
    };

    const staticForm = document.getElementById("static-form");  
    
    if(staticForm){
        const inputText = document.getElementById("phrase");
        const errorContainer = document.getElementById("error-container");

        const errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        const resultContainer = document.getElementById("result-container");
        const resultTextElement = resultContainer.getElementsByClassName("attempts");

        staticForm.addEventListener("submit", event => {
            event.preventDefault();

            try{

                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");


                // Values come from inputs as strings, no matter what :(
                const attemptsTextValue = palindrome.strip(inputText);
                //palindrome_checker.originalText;

                let li = document.createElement("li");
                li.appendChild(document.createTextNode(attemptsTextValue));

                if(palindrome.palindrome_checker(attemptsTextValue)){
                    li.setAttribute("class", "is-palindrome");
                }
                else li.setAttribute("class", "not-palindrome");

                resultTextElement.appendChild(li);
                resultContainer.classList.remove("hidden");
            } catch (e) {
            const message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            }
        });
    }
}
)
();