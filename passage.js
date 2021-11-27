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

            // before we push any coordinates, we should do the line wrapping
            // if the current letter will go past width-MARGIN, new line
            // if (textWidth(letter) + cursor_x > width - MARGIN) {
            //     // the 5 just makes sure there's no overlap or touching
            //     cursor_y += textAscent() + textDescent() + 10
            //     cursor_x = MARGIN
            // } // this is my old letter wrap

            // first we just need to check if we're at a space.
            if (this.text[i] === " ") {
                // now that we know we're at a space, we can work with
                // several whitespace variables that I can modify and update!

                // we know where the first space is so we can just set it to i
                let spaceAtI = i
                // we need to use indexOf to find the second space. We go to
                // i+1 because the index is inclusive
                let nextSpaceFromI = this.text.indexOf(" ", i + 1)

                // now we have the substring parameters for the next word!
                let nextWord = this.text.substring(
                    spaceAtI,
                    nextSpaceFromI
                )

                // if the length of the next word is going to exceed width -
                // MARGIN, wrap around.
                if (cursor_x + textWidth(nextWord) > width - MARGIN) {
                    cursor_x = MARGIN
                    cursor_y += textAscent() + textDescent() + 10
                }
            }

            coordinates.push(new p5.Vector(cursor_x, cursor_y))

            // fill applies to text, but stroke does not for some reason.
            fill(0, 0, 100)

            // draw text at cursor_x, cursor_y
            text(letter, cursor_x, cursor_y)

            // no matter what I don't want any stroke!
            noStroke()
            // if letter was typed correctly, fill transparent green
            if (this.correctList[i] === true) {
                fill(90, 80, 80, 30)
            }

            // else if letter was incorrect, fill transparent red
            else if (this.correctList[i] === false) {
                fill(0, 80, 80, 30)
            }

            // else, or if the letter is not typed yet, fill nothing
            else {
                noFill()
            }

            /* rect coordinates:
                 x = cursor_x
                 y = cursor_y - textAscent() - textDescent()
                 w = textWidth(letter)
                 h = textAscent() + textDescent
             */

            let x = cursor_x
            let y = cursor_y - textAscent() - textDescent() - 1
            let w = textWidth(letter)
            let h = textAscent() + 2*textDescent() + 2

            rect(x, y, w, h, 4)


            // update cursor_x.
            // TODO do not code past here!
            cursor_x += textWidth(letter) + 1
        }

        // the position of the cursor
        let cursor = coordinates[this.index]

        // draw the cursor
        noStroke()
        fill(0, 0, 100)
        // we need to add to the y so that the cursor isn't exactly on the
        // letter
        rect(cursor.x, cursor.y + 3, textWidth(this.text[this.index]), 2, 2)
    }

    setCorrect() {
        // we want to push true onto the value stack and advance the index
        this.correctList.push(true)
        this.index++

        // try to check if we're at this.text.length, if so call noLoop()
        if (this.index >= this.text.length - 1) {
            noLoop()
        }
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
