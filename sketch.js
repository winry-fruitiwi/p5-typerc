/*
@author Winry
@date 2021-11-20

*/

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
