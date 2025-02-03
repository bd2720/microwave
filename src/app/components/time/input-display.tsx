export default function InputDisplay({ timeInput }: {timeInput: string }){
  let displayStr = timeInput.padStart(4, '0'); // pad with zeros
  displayStr = displayStr.slice(0, 2) + ':' + displayStr.slice(2); // insert :

  return (<>{displayStr}</>);
}