import Image from 'next/image';
export default function Header(){
  return (
    <header className="w-full h-28 bg-zinc-300 shadow-xl">
      <Image
        className="hidden md:block absolute top-2 left-2 rounded-sm"
        width={96}
        height={96}
        src='/bd2720-watermark.png'
        alt='bd2720'
      />
      <h1 className="text-4xl text-center font-semibold p-3">
        Microwave Timer
      </h1>
      <p className="text-md md:text-lg text-center text-zinc-600">
        Press{" "}
        <span className="text-zinc-100">
          Cook Time,{" "}
        </span>
        enter a {" "}
        <span className="text-sky-500">
          time
        </span> and hit{" "}
        <span className="text-green-500">
          START!
        </span>
      </p>
    </header>
  );
}