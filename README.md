# Microwave Timer
A microwave-themed timer app created with `Next.js` + `React` + `TypeScript` + `Tailwind CSS`.
- While the microwave is not cooking, its display will show the current local time.
- Press `Cook Time`, then enter a time and press `START`. The microwave's door will glow when it is cooking.
- Use `Add 30 Sec` to increase the running timer by 30 seconds without pausing, or to immediately begin cooking for 30 seconds.
- The microwave will once again display the current time when cooking ends; a beeper sound will play if `volume` is above zero.

## Controls
- `Cook Time` enables entering a desired cook time `(mm:ss)`
- `Digits (0-9)` append a digit to the desired cook time
- `START` starts cooking for the duration entered
- `STOP` stops cooking or inputting cook time
- `Add 30 Sec` adds 30 seconds to current cook time; can be used to start cooking immediately
- `Door Handle` stops cooking

## Settings
Click the gear icon at the top right to access the **Settings** menu. You can:

- Toggle the theme/background between light and dark mode (system theme by default)
- Set the application's volume from 0-99 (0 by default)
- Toggle the microwave's *hum* sound (enabled by default)

## Example (Timer)
![microwave1](https://github.com/user-attachments/assets/2e4f5d98-231c-4562-b2b5-2b1f18f04d80)

## Example (Settings)
![microwave2](https://github.com/user-attachments/assets/5af7e705-d5e8-47cd-ab76-f019fb0ab9b9)
