import Settings from '@/app/components/settings';
import Image from 'next/image';
import Link from 'next/link';

export default function Header(){
  return (
    <header className="w-full h-28 bg-zinc-400 dark:bg-zinc-700 shadow-xl flex justify-between items-center p-2">
      <div className="size-24 flex justify-center items-center">
        <Link href="https://bd2720.github.io/" className="shrink-0">
          <Image
            className="rounded-md hover:ring-2 ring-zinc-500 dark:ring-zinc-400 size-12 bg-zinc-400"
            width={96}
            height={96}
            src='bd2720-watermark-96.png'
            alt='bd2720'
          />
        </Link>
      </div>
      <div>
        <h1 className="dark:text-zinc-100 text-2xl md:text-4xl text-center font-semibold m-1">
          Microwave Timer
        </h1>
        <p className="dark:text-zinc-300 text-sm md:text-lg text-center text-zinc-600 p-2">
          Press{" "}
          <span className="bg-zinc-800 text-zinc-100 rounded-sm px-1">
            Cook Time
          </span>
          , enter a {" "}
          <span className="bg-zinc-800 text-sky-400 rounded-sm px-1">
            time
          </span> and hit{" "}
          <span className="bg-zinc-800 text-green-400 rounded-sm px-1">
            START
          </span>
          !
        </p>
      </div>
      <div className="size-24 flex justify-center items-center">
        <Settings />
      </div>
    </header>
  );
}