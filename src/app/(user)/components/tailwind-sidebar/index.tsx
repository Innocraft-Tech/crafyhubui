'use client';
import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import { IRoute } from '@/data/navigation';

function TailwindSidebar(props: {
  routes: IRoute[];
  [x: string]: any;
}): JSX.Element {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={'mx-[56px] mt-[50px] flex items-center'}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold  text-navy-700 dark:text-white">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 inline"
          >
            <path
              d="M0 8.57143C0 3.83756 3.83756 0 8.57143 0H27.4286C32.1624 0 36 3.83756 36 8.57143V27.4286C36 32.1624 32.1624 36 27.4286 36H8.57143C3.83756 36 0 32.1624 0 27.4286V8.57143Z"
              fill="#FF0055"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.4286 1.02857H8.57143C4.40562 1.02857 1.02857 4.40562 1.02857 8.57143V27.4286C1.02857 31.5944 4.40562 34.9714 8.57143 34.9714H27.4286C31.5944 34.9714 34.9714 31.5944 34.9714 27.4286V8.57143C34.9714 4.40562 31.5944 1.02857 27.4286 1.02857ZM8.57143 0C3.83756 0 0 3.83756 0 8.57143V27.4286C0 32.1624 3.83756 36 8.57143 36H27.4286C32.1624 36 36 32.1624 36 27.4286V8.57143C36 3.83756 32.1624 0 27.4286 0H8.57143Z"
              fill="#FF0055"
            />
            <path
              opacity="0.5"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.2861 10.3024C22.2861 11.4477 21.345 12.3762 20.184 12.3762L19.3409 12.3762C15.9046 12.3762 13.119 15.1243 13.119 18.5143C13.119 21.9043 15.9046 24.6524 19.3409 24.6524L19.7133 24.6524C20.8743 24.6524 21.8155 25.5808 21.8155 26.7262C21.8155 27.8715 20.8743 28.8 19.7133 28.8L19.3409 28.8C13.5827 28.8 8.9147 24.1949 8.9147 18.5143C8.9147 12.8336 13.5827 8.22857 19.3409 8.22858L20.184 8.22858C21.345 8.22858 22.2861 9.15706 22.2861 10.3024Z"
              fill="white"
            />
            <path
              opacity="0.7"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.6572 10.3024C23.6572 11.4477 22.7161 12.3762 21.5551 12.3762L20.712 12.3762C17.2757 12.3762 14.4901 15.1243 14.4901 18.5143C14.4901 21.9043 17.2757 24.6524 20.712 24.6524L21.0844 24.6524C22.2454 24.6524 23.1866 25.5808 23.1866 26.7262C23.1866 27.8715 22.2454 28.8 21.0844 28.8L20.712 28.8C14.9538 28.8 10.2858 24.1949 10.2858 18.5143C10.2858 12.8336 14.9538 8.22857 20.712 8.22858L21.5551 8.22858C22.7161 8.22858 23.6572 9.15706 23.6572 10.3024Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.0283 10.3024C25.0283 11.4477 24.1113 12.3762 22.9801 12.3762L22.1586 12.3762C18.8105 12.3762 16.0962 15.1243 16.0962 18.5143C16.0962 21.9043 18.8105 24.6524 22.1586 24.6524L22.5215 24.6524C23.6527 24.6524 24.5697 25.5808 24.5697 26.7262C24.5697 27.8715 23.6527 28.8 22.5215 28.8L22.1586 28.8C16.548 28.8 11.9998 24.1949 11.9998 18.5143C11.9998 12.8336 16.548 8.22857 22.1586 8.22858L22.9801 8.22858C24.1113 8.22858 25.0283 9.15706 25.0283 10.3024Z"
              fill="white"
            />
          </svg>
          CrafyHub
        </div>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
}

export default TailwindSidebar;
