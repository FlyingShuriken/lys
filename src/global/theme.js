const theme_changer = () => {
    const themeButton = document.getElementById("theme-selector");
    const body = document.documentElement;

    var theme = localStorage.getItem("theme");

    if (theme) {
        body.setAttribute("data-theme", theme);
    } else {
        localStorage.setItem("theme", "light");
    }

    // Button Event Handlers

    document.getElementById("theme-selector").addEventListener("click", () => {
        var theme = localStorage.getItem("theme");
        if (theme === "light") {
            body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            const newButton = document.createElement("i");
            newButton.className = "bi bi-sun";
            themeButton.replaceChild(newButton, themeButton.childNodes[1]);
        } else if (theme === "dark") {
            body.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            const newButton = document.createElement("i");
            newButton.className = "bi bi-cloud-moon";
            themeButton.replaceChild(newButton, themeButton.childNodes[1]);
        } else {
            console.log(theme);
        }
    });
}

export default theme_changer;