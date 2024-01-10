enum RadioMessage {
    message1 = 49434
}
/**
 * light sensor/flashlight
 * 
 * on A button pressed, it will measure light level, and if it detects the light level to be below 100, it will activate a flashlight.
 */
// This is the light snesor. If light level below 100 it activates flashlight.
input.onButtonPressed(Button.A, function () {
    music.stopAllSounds()
    basic.showNumber(input.lightLevel())
    if (input.lightLevel() < 100) {
        music.play(music.createSoundExpression(
        WaveShape.Sawtooth,
        1045,
        0,
        255,
        255,
        500,
        SoundExpressionEffect.Tremolo,
        InterpolationCurve.Linear
        ), music.PlaybackMode.UntilDone)
        led.setBrightness(255)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
})
/**
 * crash sensor
 * 
 * if it detects a hard impact it will sound an alarm
 */
input.onGesture(Gesture.SixG, function () {
    music.setVolume(255)
    music.play(music.stringPlayable("C5 - C5 - C5 - - - ", 700), music.PlaybackMode.UntilDone)
    music.play(music.createSoundExpression(WaveShape.Sawtooth, 1, 5000, 255, 255, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.LoopingInBackground)
})
/**
 * SOS Signal 
 * 
 * on AB Button pressed it will send a radio signal and sound an alarm
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
 * RECEPTION OF MESSAGE
 */
radio.onReceivedString(function (receivedString) {
    music.play(music.createSoundExpression(WaveShape.Square, 1440, 1, 255, 255, 200, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    basic.showString("msg rcvd")
})
/**
 * COMPASS CALIBRATES ON INITIALIZATION
 */
input.onButtonPressed(Button.B, function () {
    music.stopAllSounds()
    basic.showNumber(input.compassHeading())
})
/**
 * THERMOMETER TIME AND DATE through capacitive touchpad on logo
 */
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    music.stopAllSounds()
    basic.showNumber(input.temperature())
    basic.showString(timeanddate.dateTime())
})
/**
 * on start it sets time to default value
 */
timeanddate.set24HourTime(10, 7, 0)
timeanddate.setDate(12, 4, 2023)
