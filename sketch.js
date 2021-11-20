/*
@author Winry
@date 2021-11-20

code plan:
    add old setup with variables, draw, preload functions back in
        setup should have correctSound, incorrectSound, passage
        draw should simply render the passage
        preload should load lucida
    create template for passage.js
        passage should include: render, setIncorrect, setCorrect,
        getCurrentChar, printCorrectList
        render comment: "There are two indices: the index the user is at,
        and the index in the loop that iterates through my text and
        displays it each frame"
    display one-line passage
        loop through characters in this.text and display them as text using
        a p5.Vector called currentCharPosition. Use positions immediately!
    fill in setCorrect and setIncorrect
        should push true or false onto this.correctList and update this.index
        test with printCorrectList
    create a cursor for where the user is typing
        use currentCharPosition and display a cursor at x and y only if i is
        this.index
        TODO do this outside the loop using coordinates array
    make correct/incorrect highlights
        if correct, fill green
        if incorrect, fill red
        if not typed yet, no fill
        TODO rectangle coordinates
    letter wrapping
        if currentCharPosition + textWidth(letter) > width-someMargin,
        update currentCharPosition
            TODO update with x = someMargin, y += textAscent() + textDescent() +
             margin
    word wrapping when this.text[i] === " "
        use previousWhitespace, nextWhitespace to find nextWord
        If currentCharPosition + textWidth(nextWord) > with-someMargin,
        update currentCharPosition
    bar on top of current word
        if needed, clarify variable names before starting. Prevents confusion
        create new variables based on this.index, finding whitespace
        create a word from first whitespace to next whitespace
        draw rectangle based on whitespace

    additions:
        loading screen
        accuracy
        wpm

*/


function preload() {

}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
}

function draw() {
    background(234, 34, 24)
}

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
    // if (passage.getCurrentChar() === key) {
    //     passage.setCorrect()
    //     correctSound.play()
    // } else {
    //     passage.setIncorrect()
    //     incorrectSound.play()
    // }

    // this was a test.
    // passage.printCorrectList()
}
