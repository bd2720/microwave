import Header from '@/app/components/header';
import Microwave from '@/app/components/microwave';

export default function Home() {
  return (
    <div className="w-screen min-h-screen">
      <Header />
      <div className=" w-full h-full flex justify-center items-center pt-16 px-6">
        <Microwave />
      </div>
    </div>
  );
}
