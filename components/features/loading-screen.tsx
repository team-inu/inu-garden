import Image from 'next/image';

const Loading = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-5">
      <Image
        priority
        src="/images/inu.png"
        alt="shiba"
        width={160}
        height={160}
        className="animate-pulse"
        placeholder="blur"
        blurDataURL="/images/inu.png"
      />
      <h1 className="mb-5 text-xl font-bold text-slate-700">Loading...</h1>
    </div>
  );
};

export default Loading;
