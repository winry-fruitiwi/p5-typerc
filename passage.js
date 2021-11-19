/*

 */

class Passage {
    constructor(text) {
        this.text = text
        this.index = 0 // where in the passage we're currently typing
        this.correctList = [] // booleans recording character correctness
    }


    render() {

        // TODO pseudocode for the bar on top of each word

        /*
           first I define a previousDelimiter, which is <= this.index
           then I define a nextDelimiter, which is > this.index
           also define coordinates, a list of all coordinates I visit
           finally I define currentWord, which is a substring from
           previousDelimiter to nextDelimiter

           in the for loop:
               push a vector into coordinates

               to fix the whitespace problem, find a way to make currentWord
               also include the current whitespace so I type the whitespace
               as part of the end of the word, not as part of the start.

           after the for loop:
               create a rectangle starting from previousDelimiter's position
               and have a width of textWidth("some letter") * currentWord.len
               height should be very small, and y should be the y coordinate
               minus the text ascent and text descent
        */

        let MARGIN_TOP = 30 + textAscent()
        let MARGIN_SIDES = 30
        // the bottom left corner of the current letter we are typing = cursor

        // textWidth("letter or word") returns the same for each letter
        // in the alphabet if you're working in a monospace font, giving
        // lots of flexibility!
        let cursor_x = MARGIN_SIDES
        let cursor_y = MARGIN_TOP

        // define variables as listed above
        // nextDelimiter should only be the current delimiter.
        // TODO define three new variables with proper naming
        let startOfCurrentWord = this.text.lastIndexOf(" ", this.index)+1

        // TODO why is this necessary?
        if (startOfCurrentWord === -1) {
            startOfCurrentWord = 0
        }

        let endOfCurrentWord = this.text.indexOf(" ", this.index)

        // TODO why does this case exist?
        if (endOfCurrentWord === -1) {
            endOfCurrentWord = this.text.length - 1
        }

        let previousWhitespace = 0
        let nextWhitespace = this.text.indexOf(" ")
        let currentWord = this.text.substring(
            startOfCurrentWord,
            endOfCurrentWord
        )
        // TODO add coordinates list
        let coordinates = []

        // switch to detect if I've wrapped
        let wrapped = false

        /*  display the entire passage without text wrap
         */
        for (let i = 0; i < this.text.length; i++) {
            let letter = this.text.charAt(i)
            // TODO push cursor_x and cursor_y as a p5.Vector into coordinates
            coordinates.push(new p5.Vector(cursor_x, cursor_y))

            // let cursor = new p5.Vector(
            //     30 + textWidth("Y") * this.index,
            //     MARGIN_TOP
            // )

            // old-fashioned single letter wrap
            // if (cursor_x + textWidth(letter) > width - MARGIN_SIDES) {
            //     cursor_y += textAscent() + 2 * textDescent()
            //     cursor_x = MARGIN_SIDES
            // }

            // Weirdly, text is only colored by fill. It should be colored
            // by stroke, since I can imagine using a pen to write the
            // letter, but a rectangle needs to be filled in with a bucket.
            fill(0, 0, 100)
            // save the position of the ith character. we'll need this later
            text(
                letter,
                cursor_x,
                cursor_y
            )

            // the cursor
            if (i === this.index) {
                rect(cursor_x, cursor_y+2, textWidth(letter), 2, 2)
            }

            /*  show the highlight box for correct vs incorrect after we type
             */
          
            if (this.correctList[i] === true) {
                fill(90, 80, 80, 30)
            } else if (this.correctList[i] === false) {
                fill(0, 80, 80, 30)
            } else {
                noFill()
            }

            // highlight box
            rect(
                cursor_x - 1,
                cursor_y - textAscent() - textDescent(),
                textWidth(letter) + 1,
                textAscent() + 2 * textDescent(),
                3
            )

            // line wrapping
            if (this.text.charAt(i) === " ") {
                // we want to find the next whitespace from i
                previousWhitespace = i
                nextWhitespace = this.text.indexOf(" ", i + 1)
                if (nextWhitespace === -1)
                    nextWhitespace = this.text.length - 1

                let wordOnEdge = this.text.substring(
                    previousWhitespace+1,
                    nextWhitespace // TODO
                )

                text('.'+ wordOnEdge + '.', width/2, height/2)

                // a test. shows that something doesn't work because of
                // multiple words showing up in one line!
                // text(nextWord, width/2, height-100)

                // TODO add a switch keeping track of word wraps. if it's
                //  on, I don't need to increment the x coordinate.
                if (cursor_x + textWidth(wordOnEdge) > width - MARGIN_SIDES) {
                    cursor_y += textAscent() + 2 * textDescent() + 5 // whitespace between lines
                    cursor_x = MARGIN_SIDES

                    wrapped = true
                }
            }

        // TODO check if we're finished, otherwise we try to read [index+1]

            if (wrapped === false)
                cursor_x += textWidth(letter) + 1

            // reset the switch
            wrapped = false
        }

        // TODO add bar above the characters over here, where I don't need
        //      to worry about extra variables

        /* exact coordinates:
             x = coordinates[previousDelimiter].x
             y = coordinates[nextDelimiter].y - textAscent() - textDescent()
             w = textWidth(" ") * currentWord.length
             h = something small like 2
             cornerRounding = decide this later
        */

        // TODO replace this with a score screen
        if (this.index === this.text.length - 1)
            noLoop()

        else {
            let x = coordinates[startOfCurrentWord].x
            let y = coordinates[endOfCurrentWord].y - textAscent() - textDescent()
            let w = textWidth(currentWord)
            let h = 2

            fill(0, 0, 50)
            text(x, 3, height-80)
            text(y.toString(), 3, height-60)
            text(endOfCurrentWord.toString(), 3, height-40)
            text(startOfCurrentWord.toString(), 3, height-20)
            text("," + currentWord + ".", 3, height-100)

            // we don't want a bar showing up if we are currently on a space char
            if (this.text[this.index] !== ' ')
                // bar on top of currentWord
                rect(x, y, w, h)
        }
    }


    getCurrentChar() {
        return this.text.charAt(this.index)
    }


    // set the current char to correct
    setCorrect() {
        this.correctList.push(true)
        this.index += 1

        console.assert(this.correctList.length === this.index)
    }


    // set the current char to be incorrect
    setIncorrect() {
        this.correctList.push(false)
        this.index += 1
    }

    printCorrectList() {
        for (let correctOrIncorrect of this.correctList) {
            console.log(correctOrIncorrect)
        }
    }
}
