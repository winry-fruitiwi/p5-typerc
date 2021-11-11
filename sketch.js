/*
@author Winry
@date 2021-11-11

coding plan:
    disable sound (not its own commit)
    fill in passage.js
        start with the basics: do render without line wrapping (commit here)
    enable sound and retype keyPressed function for familiarity
    fill in passage.js
        now do the line wrapping

    this project is done by now. Additional projects:
        Add wpm
        Add accuracy up until now
        Add text for what you've done (as of 2021-11-11)

 */


let font
let passage
let correctSound // audio cue for typing one char correctly
let incorrectSound // audio cue for typing one char incorrectly


function preload() {
    font = loadFont('data/lucida-console.ttf')
    // font = loadFont('data/Meiryo-01.ttf')
}


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 30)

    correctSound = loadSound('data/correct.wav')
    incorrectSound = loadSound('data/incorrect.wav')

    passage = new Passage("Developers often work in teams, but it is not" +
        " uncommon to find a developer who works independently as a" +
        " consultant.  ")
}


function draw() {
    background(234, 34, 24)

    passage.render()
}


// retype this for familiarity
function keyPressed() {
    // don't do anything if we detect SHIFT ALT CONTROL keycodes
    if (keyCode === SHIFT ||
        keyCode === ALT ||
        keyCode === CONTROL ||
        keyCode === 20) { // this is capslock
        return
    }

    /*  if the key we just pressed === passage.getCurrentChar, play correct
        sound, rewind it, passage.setCorrect(). otherwise, play and rewind
        the incorrect sound. passage.setIncorrect().
     */
    if (passage.getCurrentChar() === key) {
        passage.setCorrect()
        correctSound.play()
    } else {
        passage.setIncorrect()
        incorrectSound.play()
    }
}