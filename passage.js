class Passage {
    constructor(text) {
        this.text = text
        this.index = 0 // where in the passage we're currently typing
        this.correctList = [] // booleans recording character correctness
    }

    render() {
        // There are two indices: the index the user is at, and the index in
        // the loop that iterates through my text and displays it each frame

        // margin on any side of the browser
        let MARGIN = 30

        // keeps track of the coordinates of every letter in the passage
        let coordinates = []

        // we can't use a list of coordinates if we don't have a cursor
        // containing a coordinate!
        let cursor_x = MARGIN
        // p5.js has its text function start at the bottom left. That means
        // if we started at the margin, at some point the textAscent is
        // going to get bigger than the margin and you won't be able to see
        // the letter.
        let cursor_y = MARGIN + textAscent()

        // displays a one-line passage of text with a coordinates list
        for (let i = 0; i < this.text.length; i++) {
            let letter = this.text[i]
            coordinates.push(new p5.Vector(cursor_x, cursor_y))

            // fill applies to text, but stroke does not for some reason.
            fill(0, 0, 100)

            // draw text at cursor_x, cursor_y
            text(letter, cursor_x, cursor_y)

            // update cursor_x

            cursor_x += textWidth(letter) + 1
        }

        // the position of the cursor
        let cursor = coordinates[this.index]

        // draw the cursor
        noStroke()
        // we need to add to the y so that the cursor isn't exactly on the
        // letter
        rect(cursor.x, cursor.y + 3, textWidth(this.text[this.index]), 2, 2)
    }

    setCorrect() {
        // we want to push true onto the value stack and advance the index
        this.correctList.push(true)
        this.index++
    }

    setIncorrect() {
        // the user made a mistake, which is ok. We simply alert the user
        // with a sound and let them move on.
        this.correctList.push(false)
        this.index++
    }

    printCorrectList() {
        print(this.correctList)
    }

    getCurrentChar() {
        // we want to grab the character this.index is on.
        return this.text[this.index]
    }
}
