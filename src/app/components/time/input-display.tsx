export default function InputDisplay({ timeInput }: {timeInput: string }){
  const displayStr = timeInput.slice(0, 2) + ':' + timeInput.slice(2); // insert :

  return (<>{displayStr}</>);
}