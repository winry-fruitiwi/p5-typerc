/*
@author Winry
@date 2021-11-11

coding plan:
    display a one-line passage
        print each variable separately with a cursor to keep track of where
        each letter is
    create a list of booleans to indicate correct and incorrect letters
        fill in setCorrect() and setIncorrect()
        test if the program recognizes if the user got a letter correct or
        not by printing the result to the console
    create the cursor under the current letter
        translate from the cursor variable
    display correct and incorrect letters
        check list of correct letters. if the letter is correct, display a
        green rectangle, otherwise display a red one
    add text wrap
        check if cursor + textWidth > width - margin
    add full word wrap
        if current letter is a space, find the next space to identify a word
    add gray bar to show how large the word is

    additions:
        wpm
        accuracy up until now
        text for what you've done

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

    passage = new Passage("This is Winry!")
}


function draw() {
    background(234, 34, 24)

    fill(0, 0, 100)
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

    passage.printCorrectList()
}