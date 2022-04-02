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
        TODO rect coordinates
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

        for accuracy, I can just take the length of my correctList and
        figure out how many of them are correct, then give me the accuracy.

        wpm:
            use millis() to find wpm of current passage
                divide length of current passage by 5 to get num words.
                divide millis() by 1000 to get seconds.
                divide seconds by 60 to get minutes.
                divide numWords by minutes.
             use millis() to find wpm of current word
                I think I just need to take the length of my current word,
                multiply the millis by 1/60000, divide the length by the
                minutes, and display some sort of marking for that.

        loading and result screens:
            implement loading screen
                for a fixed amount of time, display "Unlocking..." with a
                makeshift lock. Then, the lock opens, creating a burst of
                particles and then the text displays "Unlocked!"
            implement results screen
                the unlocked makeshift lock will appear again with a message
                "Locking..." After a random amount of time between 1s and
                3s, the lock will close with another particle burst with
                "Locked!" as the text. Then the results will show up.
            add a smooth transition to both screens
                maybe save an image of the finished state and transition there?
                Other methods include: putting different layers in front,
                simply transitioning after some time.
*/
let correctSound, incorrectSound, passage, font

function preload() {
    font = loadFont("data/lucida-console.ttf")
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    correctSound = loadSound('data/correct.wav')
    incorrectSound = loadSound('data/incorrect.wav')
    textFont(font, 30)

    passage = new Passage("Hey! I'm doing WPM calculations now. As you can" +
        " see, I've already done the accuracy (but it was in the wrong" +
        " place, which I fixed). Now I'll be putting the WPM in the right" +
        " place. ")
}

function keyPressed() {
    // don't do anything if we detect SHIFT ALT CONTROL or F1-F12 keycodes
    if (keyCode === SHIFT ||
        keyCode === ALT ||
        keyCode === CONTROL ||
        keyCode === 20 || // this is capslock
        keyCode === 112 ||
        keyCode === 113 ||
        keyCode === 114 ||
        keyCode === 115 ||
        keyCode === 116 ||
        keyCode === 117 ||
        keyCode === 118 ||
        keyCode === 119 ||
        keyCode === 110 ||
        keyCode === 111 ||
        keyCode === 112 ||
        keyCode === 113
    ) {
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

    // this was a test.
    // passage.printCorrectList()
}

function draw() {
    background(234, 34, 24)

    passage.render()
}
