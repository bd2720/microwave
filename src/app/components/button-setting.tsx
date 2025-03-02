import Button from '@/app/components/ui/button';

interface ButtonSettingProps {
  buttonText: string, // name of option (on button)
  displayText: string, // text for display section
  onClick: () => void // called when button is clicked
}

export default function ButtonSetting({ buttonText, displayText, onClick}: ButtonSettingProps){
  return (
    <div className="w-full flex justify-between">
      <Button 
        className="size-16 text-sm bg-zinc-800"
        onClick={onClick}
      >
        {buttonText}
      </Button>
      <p className="text-md bg-zinc-800 text-sky-500 rounded-sm w-48 flex justify-center items-center">
        <span>
          {displayText}
        </span>
      </p>
    </div>
  );
}