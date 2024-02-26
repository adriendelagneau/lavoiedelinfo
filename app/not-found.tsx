import Link from 'next/link';

const NotFound = () => {

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[500px] flex flex-col items-center justify-center relative top-0">
        <h1 className="">404</h1>
        <p className="">Page Not Found</p>
        <Link href="/" className="">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
