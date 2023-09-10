const side_panel = document.querySelector("#Slider_Menu");
const checkbox = document.querySelector('input[type="checkbox"]');
const Left_panel = document.querySelector(".Left_panel_icon_open_cont");
let panel_open_toggle = false; // Start with the panel closed

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        side_panel.style.left = "0px";
        Left_panel.style.marginLeft = "300px";
        panel_open_toggle = true;
    } else {
        side_panel.style.left = "-300px";
        Left_panel.style.marginLeft = "0px";
        panel_open_toggle = false;
    }
});
