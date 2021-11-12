/*

 */

class Passage {
    constructor(text) {
        this.text = text
        this.index = 0 // where in the passage we're currently typing
        this.correctList = [] // booleans recording character correctness
    }


    render() {
        let MARGIN_TOP = 30 + textAscent()
        let MARGIN_SIDES = 30
        // the bottom left corner of the current letter we are typing = cursor

        /*  display the entire passage without text wrap
         */
        for (let i = 0; i < this.text.length; i++) {
            let letter = this.text.charAt(i)
            let cursor = new p5.Vector(
                30 + textWidth(letter) * this.index,
                30 + textAscent()
            )
            // save the position of the ith character. we'll need this later
            text(
                letter,
                MARGIN_SIDES + i*textWidth(letter),
                MARGIN_TOP)

            rect(cursor.x, cursor.y+2, textWidth(letter), 2)

            /*  show the highlight box for correct vs incorrect after we type
             */
          


            /*  draw current letter above the highlight box in terms of z-index
             */
        


            /*  modify cursor position to where the next letter should be
                each highlight box should be 1 pixel bigger on left and right
                1+1=2 total pixels of extra width
             */

            /*  let's do a simple word wrap, wrapping just by character!
             */


            // this is the horizontal coordinate where we must text wrap

            /*  if we're at a whitespace, determine if we need a new line:
                    find the next whitespace
                    the word between us and that whitespace is the next word
                    if the width of that word + our cursor + current space >
                     limit, then newline
             */



        /*  add current word top highlight horizontal bar
         */
        // find index of next and previous whitespace chars

        // next delimiter index

        // previous delimiter index

        // +1 because we don't want the line to go over the previous
        // whitespace char



        /*  add cursor below current character
        */

        // TODO check if we're finished, otherwise we try to read [index+1]
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