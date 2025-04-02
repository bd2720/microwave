import Settings from '@/app/components/settings/settings';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  togglePause?: () => void
}

export default function Header({ togglePause }: HeaderProps){
  return (
    <header 
      className="w-full h-28 bg-zinc-400 dark:bg-zinc-700 shadow-xl flex justify-between items-center p-2"
      aria-label="Header"
    >
      <div className="size-24 flex justify-center items-center">
        <Link 
          href="https://bd2720.github.io/" 
          className="shrink-0"
          aria-label="Visit the creator"
          title="Visit the creator"
        >
          <Image
            className="rounded-md hover:ring-2 ring-zinc-500 dark:ring-zinc-400 size-12 bg-zinc-400 text-zinc-500"
            width={96}
            height={96}
            src='bd2720-watermark-96.png'
            alt='bd2720'
          />
        </Link>
      </div>
      <div>
        <h1 className="dark:text-zinc-100 text-2xl md:text-4xl text-center font-semibold m-1 text-nowrap">
          Microwave Timer
        </h1>
        <p 
          className="dark:text-zinc-300 text-sm md:text-lg text-center text-zinc-600 p-2"
          aria-label="Press Cook Time, enter a time and hit START!"
        >
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
        <Settings togglePause={togglePause} />
      </div>
    </header>
  );
}