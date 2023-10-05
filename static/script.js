const side_panel = document.querySelector("#Slider_Menu");
const checkbox = document.querySelector('input[type="checkbox"]');
const Left_panel = document.querySelector(".Left_panel_icon_open_cont");
const Nav_Title_Cont = document.querySelector('.Nav_Title_Cont'); 
const CUD_Nav_Logo_Cont = document.querySelector('.CUD_Nav_Logo_Cont');
const blurscreen = document.querySelector('.blurscreenelement');
const Commandbuttons = document.querySelectorAll('.Messaging_Command');
let clickedButtonText = '';

Commandbuttons.forEach(button => {
    button.addEventListener('click', () => {
        // Store the text of the clicked button in the variable
        let innerText = ''
        if (button.classList.contains('M_C12') || button.classList.contains('M_C11')) {
             innerText = document.querySelector('.M_C11 span').textContent;
        }
        else if (button.classList.contains('M_C22') || button.classList.contains('M_C21')) {
             innerText = document.querySelector('.M_C21 span').textContent;
        }
        else if (button.classList.contains('M_C32') || button.classList.contains('M_C31')) {
             innerText = document.querySelector('.M_C31 span').textContent;
        }
        else if (button.classList.contains('M_C42') || button.classList.contains('M_C41')) {
             innerText = document.querySelector('.M_C41 span').textContent;
        }
        console.log(innerText);
        document.querySelector('.Messaging_Commands_Section').style.display = 'none';
        document.querySelector('.Messaging_Commands_Section_small').style.display = 'none';
        document.querySelector('.Messagin')
        document.querySelector('#Messaging_Section').style.height = '70px';
        
        if(window.innerWidth <= 480){
            document.querySelector('#Chat_Section').style.height = 'calc(100% - 132px)';
        }
        else{
            document.querySelector('#Chat_Section').style.height = 'calc(100% - 137px)';
        }

    });
});


let panel_open_toggle = false; 

function toggleCheckbox() {
    checkbox.checked = !checkbox.checked;
}


Left_panel.addEventListener("click", () => {

    toggleCheckbox();


    if (panel_open_toggle === false) {
        if(window.innerWidth < 427){
            blurscreen.classList.add("blurscreen");
        }


        if(window.innerWidth <= 660){
            Nav_Title_Cont.style.display = "none";
            CUD_Nav_Logo_Cont.style.display = "none";
        }
        side_panel.style.left = "0px";  
        if(window.innerWidth < 375 && window.innerWidth > 330){
            Left_panel.style.marginLeft = "275px";
        }
        else if(window.innerWidth < 330){
            Left_panel.style.marginLeft = "250px";
        }
        else{
            Left_panel.style.marginLeft = "300px";
        }

        panel_open_toggle = true;
    } else {

        if(window.innerWidth < 427){
            blurscreen.classList.remove("blurscreen");
        }
        if(window.innerWidth <= 660){
            Nav_Title_Cont.style.display = "block";
            CUD_Nav_Logo_Cont.style.display = "block";
        }
        side_panel.style.left = "-300px";
        Left_panel.style.marginLeft = "0px";
        panel_open_toggle = false;
    }
});


checkbox.addEventListener("click", (e) => {
    e.stopPropagation(); 
});


const label = document.querySelector(".hamburger");
label.addEventListener("click", () => {
    toggleCheckbox();
});


function updateElementStyles() {
    if (window.innerWidth <= 660) {
        if(side_panel.style.left == "0px"){
            Nav_Title_Cont.style.display = "none";
            CUD_Nav_Logo_Cont.style.display = "none";
        }
        else{
            Nav_Title_Cont.style.display = "block";
            CUD_Nav_Logo_Cont.style.display = "block";
        }
    }
    else{
        Nav_Title_Cont.style.display = "block";
        CUD_Nav_Logo_Cont.style.display = "block";
    }
}

window.addEventListener("resize", updateElementStyles);


updateElementStyles();



const send_button_icon = document.querySelector(".send_button_icon");

const Chat_Section = document.querySelector("#Chat_Section");
const User_Input = document.querySelector(".User_Input");
const send_button = document.querySelector(".send_button");


User_Input.addEventListener("input", ()=>{
    if(User_Input.value == ""){
        send_button_icon.src = "static/img/mapleleaficonoutline.png";
    }
    else{
        send_button_icon.src = "static/img/mapleleaficonfill.png";
    }
});

function addMessage(message, isUserMessage) {
  const messageDiv = document.createElement("div");

  if (isUserMessage) {
    messageDiv.classList.add("User_Message");

  } else {
    messageDiv.classList.add("AI_Message");
  }

  messageDiv.innerHTML = message;

    Chat_Section.appendChild(messageDiv);
    Chat_Section.scrollTo(0, Chat_Section.scrollHeight);
}

function sendMessage(message) {


    if (message !== "") {
        addMessage(message, true);
        User_Input.value = "";
    }

    fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            const content = data.content;
            addMessage(content, false);
            console.log(content);
        }).catch(error => console.error(error));
}




    
send_button.addEventListener("click", sendMessage);
User_Input.addEventListener("keydown", event => {

    if(event.keyCode === 13 && !event.shiftKey){
        event.preventDefault();
        
        sendMessage(User_Input.value.trim());
    }
});