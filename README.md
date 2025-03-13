# Microwave Timer
### [Try it Now!](https://bd2720.github.io/microwave/)
A sleek, interactive, microwave-themed timer app created with `Next.js` + `React` + `Tailwind CSS` + `TypeScript` + `Tone.js`.  
Setting timers on tasks can significantly increase your efficiency. Use **Microwave Timer** to set time limits on your daily tasks and get more done. Be sure to visit the **Settings** menu to customize your theme and enable sound effects!

- While the microwave is not cooking, its display will show the current local time.
- Press `Cook Time`, then enter a time and press `START`. The microwave's door will glow when it is cooking.
- While cooking, use `PAUSE` at any time to pause/unpause the timer, and `STOP` to cancel the timer.
- The microwave will once again display the current time when the cooking timer expires; a beeper sound will play if *volume* is above zero.

## Controls
- `Cook Time` enables entering a desired cook time `(mm:ss)`
- `Digits (0-9)` append a digit to the desired cook time
- `START` starts cooking for the duration entered
- `PAUSE` pauses/unpauses timer if cooking
- `STOP` stops cooking or inputting cook time
- `Add 30 Sec` adds 30 seconds to current timer; can be used to start cooking immediately
- `Door Handle` stops cooking

## Settings
Click the `Gear` button at the top right to access the **Settings** menu. You can:

- Toggle the *theme* between light, dark, and system mode (system theme by default)
- Set the application's *volume* from 0-99 (0 by default)
- Toggle the microwave's *hum* sound when cooking (enabled by default)

## Additional Interactions
- Pressing `START` while not inputting a time will restart the previous timer
- While cooking is paused, pressing `Add 30 Sec` can add multiples of 30 seconds to the current timer without resuming cooking
- After cooking completes, pressing `STOP` or `Door Handle` will interrupt the timer sound
- Entering the **Settings** menu by clicking the `Gear` button will pause the timer if cooking
- All values set in **Settings** will persist across site visits

## Gallery
### Example 1 (Desktop)
![microwave1](https://github.com/user-attachments/assets/f62c0004-a496-4a95-9310-a699f2a52d34)

### Example 2 (Mobile)
![microwave2](https://github.com/user-attachments/assets/66544027-542d-4292-90fe-66eb6503320c)

### Example 3 (Settings)
![microwave3](https://github.com/user-attachments/assets/e743a3b7-6b0b-47a3-a286-4962ad02dbe1)
