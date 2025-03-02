import { useTheme } from 'next-themes';
import ButtonSetting from '@/app/components/button-setting';

// available themes
const themes = ['system', 'light', 'dark'];

export default function ThemeSetting(){
  // extract theme + setter from next-themes
  const {theme, setTheme} = useTheme();

  // determine next theme
  function handleThemeChange(){
    if(!theme) return;
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
  }
  
  return (
    <ButtonSetting
      buttonText="Change Theme"
      displayText={`${theme?.toUpperCase()} MODE ON`}
      onClick={handleThemeChange}
    />
  );
}