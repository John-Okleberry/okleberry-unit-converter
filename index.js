//
// Variables
//

// Variables for interacting with the UI
const inputEl = document.getElementById("input-el")
const btnConvert = document.getElementById("btn-convert")
const resultsLength = document.getElementById("results-length")
const resultsVolume = document.getElementById("results-volume")
const resultsMass = document.getElementById("results-mass")

// Variables for the color theme switching
const btnTheme = document.getElementById("btn-theme")
const themes = ['dark-mode', 'light-mode', 'blue-mode', 'green-mode']
let currentThemeIndex = 0;

// Set the value for conversion to a neutral value
let value = 0



//
// Conversion Functions (Preserves spans for responsiveness)
//

// A function that converts length and updates the UI with new values (1 meter = 3.281 feet)
function convertLength(length) {
    let meters = (length / 3.281).toFixed(3)
    let feet = (length * 3.281).toFixed(3)
    resultsLength.innerHTML = `<span>${length} meters = ${feet} feet |</span>&nbsp;
                            <span> ${length} feet = ${meters} meters</span>`
}

// A function that converts volume and updates the UI with new values (1 liter = 0.264 gallon)
function convertVolume(volume) {
    let liters = (volume / 0.264).toFixed(3)
    let gallons = (volume * 0.264).toFixed(3)
    resultsVolume.innerHTML = `<span>${volume} liters = ${gallons} gallons |</span>&nbsp;
                            <span> ${volume} gallons = ${liters} liters</span>`
}

// A function that converts mass and updates the UI with new values (1 kilogram = 2.204 pound)
function convertMass(mass) {
    let kilograms = (mass * 2.204).toFixed(3)
    let pounds = (mass / 2.204).toFixed(3)
    resultsMass.innerHTML = `<span>${mass} kilograms = ${pounds} pounds |</span>&nbsp;
                            <span> ${mass} pounds = ${kilograms} kilograms</span>`
}



//
// Event Listeners - Conversions
//

// Responds to clicks of the convert button by rendering conversions after error checking
btnConvert.addEventListener("click", function () {
    value = parseFloat(inputEl.value);

    // Verifies that user input is valid before performing conversions
    if(isNaN(value) || value <= 0) {
        document.getElementById('input-error').classList.add('visually-hidden');
        alert("Please enter a valid positive number."); //Enhances visibility
        return;
    }

    // Hide error message if input is correct
    document.getElementById('input-error').classList.add('visually-hidden');
    
    renderConversions();
})

// Performs conversions and displays new values
function renderConversions() {
    convertLength(value)
    convertVolume(value)
    convertMass(value)
}



//
// Event Listeners - Theme Cycling
//


// Adjusts the theme in response to icon clicks
btnTheme.addEventListener("click", function () {
    cycleTheme();
    renderTheme();
})

// Adjusts the theme in response to keyboard input
btnTheme.addEventListener("keydown", function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent default behavior (scrolling, etc.)
        btnTheme.click(); // Trigger the click event to rotate the theme
    }
})

// Removes the current theme class and rotates the selected theme
function cycleTheme() {
    document.body.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
}

// Updates the UI with the new theme's color, font, and associated icon
function renderTheme() {
    document.body.classList.add(themes[currentThemeIndex]);
    btnTheme.src = '/image/' + themes[currentThemeIndex] + '.svg'
}