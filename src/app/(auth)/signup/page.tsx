import SignupForm from '@/components/auth/signup';
import Image from 'next/image';
// import SignupForm from '@/components/forms/SignupForm';

export default function SignupPage() {
  return (
    <>
      <div className="">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative h-screen flex-col items-center justify-center bg-[#fff9fb] bg-gradient-to-r from-fuchsia-50 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <SignupForm />
      </div>
    </>
  );
}
