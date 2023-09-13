const codeEditor = document.getElementById("editor");
const convertBtn = document.getElementById("convert");
const debugBtn = document.getElementById("debug");
const qualityBtn = document.getElementById("quality-check");
const outputRes = document.getElementById("converted-code");
const selectLanguage = document.getElementById("language");

convertBtn.addEventListener("click",convertCode);
debugBtn.addEventListener("click", debugCode);
qualityBtn.addEventListener("click", qualityCheck);

function convertCode(){
    const code = editor.getValue();
    const language = selectLanguage.value;

    if (code === "//Write your code here...") {
        Swal.fire({
            icon: 'error',
            title: 'Editor cannot be empty',
            text: 'Type the code to convert',
            confirmButtonText: 'OK'
          });
    }else if(language === ""){
        Swal.fire({
            icon: 'error',
            title: 'Language not selected',
            text: 'Please select a language',
            confirmButtonText: 'OK'
          });
    }
     else {
        // loader.style.display = 'block'; // Show loader
        // quoteElement.style.display = 'none';

        fetch(`https://code-generator-fbiy.onrender.com/convert`,{
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({"code":code, "language":language})
        })
        .then((response) => response.json())
        .then((data) => {
            outputRes.innerHTML = `Output:- \n ${data.convertedCode}`
            // loader.style.display = 'none';
            // quoteElement.style.display = 'block';
            // quoteElement.textContent = data.quote;
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: 'Failed to fetch a quote. Please try again later.',
            //     confirmButtonText: 'OK'
            // });
            // loader.style.display = 'none';
            // quoteElement.style.display = 'block';
            // quoteElement.textContent = 'Type your theme and click on Generate Quote';
        });
    }
}

function debugCode(){
    const code = editor.getValue();
    
    if (code === "//Write your code here...") {
        Swal.fire({
            icon: 'error',
            title: 'Editor cannot be empty',
            text: 'Type the code to convert',
            confirmButtonText: 'OK'
          });
    }
     else {
        // loader.style.display = 'block'; // Show loader
        // quoteElement.style.display = 'none';

        fetch(`https://code-generator-fbiy.onrender.com/debug`,{
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({"code":code})
        })
        .then((response) => response.json())
        .then((data) => {
            outputRes.innerHTML = `Output:- \n ${data.debuggedCode}`
            // loader.style.display = 'none';
            // quoteElement.style.display = 'block';
            // quoteElement.textContent = data.quote;
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: 'Failed to fetch a quote. Please try again later.',
            //     confirmButtonText: 'OK'
            // });
            // loader.style.display = 'none';
            // quoteElement.style.display = 'block';
            // quoteElement.textContent = 'Type your theme and click on Generate Quote';
        });
    }
}

function qualityCheck(){
    const code = editor.getValue();
    if (code === "//Write your code here...") {
        Swal.fire({
            icon: 'error',
            title: 'Editor cannot be empty',
            text: 'Type the code to convert',
            confirmButtonText: 'OK'
          });
    }
     else {
        // loader.style.display = 'block'; // Show loader
        // quoteElement.style.display = 'none';

        fetch(`https://code-generator-fbiy.onrender.com/quality`,{
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({"code":code})
        })
        .then((response) => response.json())
        .then((data) => {
            outputRes.innerHTML = `Output:- \n ${data.checkedCode}`
            // loader.style.display = 'none';
            // quoteElement.style.display = 'block';
            // quoteElement.textContent = data.quote;
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: 'Failed to fetch a quote. Please try again later.',
            //     confirmButtonText: 'OK'
            // });
            // loader.style.display = 'none';
            // quoteElement.style.display = 'block';
            // quoteElement.textContent = 'Type your theme and click on Generate Quote';
        });
    }
}
