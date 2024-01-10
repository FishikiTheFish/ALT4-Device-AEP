enum RadioMessage {
    message1 = 49434
}
// This is the light sensor. If light level below 100 it activates flashlight.
input.onButtonPressed(Button.A, function () {
    music.stopAllSounds()
    basic.clearScreen()
    basic.showNumber(input.lightLevel())
})
/**
 * Fall Detection
 * 
 * if it detects a hard impact it will sound an alarm
 */
input.onGesture(Gesture.SixG, function () {
    music.setVolume(255)
    music.play(music.stringPlayable("C5 - C5 - C5 - - - ", 700), music.PlaybackMode.UntilDone)
    music.play(music.createSoundExpression(WaveShape.Sawtooth, 1, 5000, 255, 255, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
/**
 * SOS Signal 
 * 
 * On AB Button pressed it will send a radio signal and sound an alarm
 */
input.onButtonPressed(Button.AB, function () {
    music.stopAllSounds()
    radio.setGroup(1)
    radio.sendString("SOS")
    music.play(music.createSoundExpression(
    WaveShape.Square,
    1001,
    1,
    255,
    255,
    500,
    SoundExpressionEffect.Warble,
    InterpolationCurve.Linear
    ), music.PlaybackMode.UntilDone)
})
/**
 * Message Reception
 */
radio.onReceivedString(function (receivedString) {
    music.play(music.createSoundExpression(WaveShape.Square, 1440, 1, 255, 255, 200, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    basic.showString("msg rcvd")
})
input.onButtonPressed(Button.B, function () {
    music.stopAllSounds()
    basic.showNumber(steps)
})
/**
 * Step Counter
 * 
 * Counts steps when device is shaken. On B press, shows total value.
 */
input.onGesture(Gesture.Shake, function () {
    steps += 1
})
/**
 * Thermometer
 * 
 * When the touchpad on logo is pressed, shows the current temperature.
 */
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    music.stopAllSounds()
    basic.showString("" + input.temperature() + "C")
})
/**
 * Greeting and Step Counter
 */
let steps = 0
basic.showString("Hello")
steps = 0
/**
 * Flashlight
 * 
 * On A button pressed, it will measure light level, and if it detects the light level to be below 100, it will activate a flashlight.
 */
basic.forever(function () {
    if (input.lightLevel() < 100) {
        led.setBrightness(255)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
