const side_panel = document.querySelector("#Slider_Menu");
const checkbox = document.querySelector('input[type="checkbox"]');
const Left_panel = document.querySelector(".Left_panel_icon_open_cont");
const Nav_Title_Cont = document.querySelector('.Nav_Title_Cont'); 
const CUD_Nav_Logo_Cont = document.querySelector('.CUD_Nav_Logo_Cont');
const blurscreen = document.querySelector('.blurscreenelement');

let panel_open_toggle = false; // Start with the panel closed

// Function to toggle the checkbox
function toggleCheckbox() {
    checkbox.checked = !checkbox.checked;
}

// Add a click event listener to the button to toggle the checkbox and open/close the panel
Left_panel.addEventListener("click", () => {
    // Toggle the checkbox
    toggleCheckbox();

    // Toggle the panel open/close
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

// Add a click event listener to the checkbox itself to prevent propagation
checkbox.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click event from reaching the parent button
});

// Add a click event listener to the label to toggle the checkbox as well
const label = document.querySelector(".hamburger");
label.addEventListener("click", () => {
    toggleCheckbox();
});

// Function to update the element styles based on window width
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
// Add an event listener to the window to call the updateElementStyles function on window resize
window.addEventListener("resize", updateElementStyles);

// Initial call to updateElementStyles to set the initial state
updateElementStyles();

// Rest of your code...

