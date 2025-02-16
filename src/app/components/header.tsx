import Settings from '@/app/components/settings';
import Image from 'next/image';
import Link from 'next/link';

export default function Header(){
  return (
    <header className="w-full h-28 bg-zinc-400/80 shadow-xl flex justify-between items-center p-2">
      <Link href="https://bd2720.github.io/">
        <Image
          className="hidden md:block rounded-sm ring-zinc-400 hover:ring-2"
          width={96}
          height={96}
          src='/bd2720-watermark.png'
          alt='bd2720'
        />
      </Link>
      <div>
        <h1 className="text-2xl md:text-4xl text-center font-semibold m-1">
          Microwave Timer
        </h1>
        <p className="text-sm md:text-lg text-center text-zinc-600 p-2">
          Press{" "}
          <span className="text-zinc-100">
            Cook Time,{" "}
          </span>
          enter a {" "}
          <span className="text-sky-500">
            time
          </span> and hit{" "}
          <span className="text-green-600">
            START!
          </span>
        </p>
      </div>
      <div className="size-24 flex justify-center items-center">
        <Settings />
      </div>
    </header>
  );
}