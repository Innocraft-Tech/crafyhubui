'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ImagePng from '@/assets/hummans-1.gif';
import { useUpdateProfileMutation } from '@/redux/api/usersApi';
import { profileUpdateSchema, TypeprofileUpdateSchema } from './profile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useGetAllUsersQuery } from '@/redux/api/usersApi';
import { useGetCompletedUserQuery } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useGetUserChatsQuery } from '@/redux/api/chatApi';
import { skipToken } from '@reduxjs/toolkit/query';
interface User {
  profilePicture: string | undefined;
  firstName: ReactNode;
  tools: any;
}
const Profile = () => {
  // const { data, isError, isLoading } = useGetAllUsersQuery();
  // const user_token = Cookies.get('access_token');
  // console.log('user_token', typeof user_token);
  // const dataOfUser = useGetCompletedUserQuery(user_token ? user_token : '').data?.user;
  // console.log('Userdata 2', dataOfUser);


  const { data: user } = useGetCompletedUserQuery();

  console.log(user, 'user');


  const [updateName, setUpdateName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');
  // const { users: userData } = data || {};

  




    const form = useForm<TypeprofileUpdateSchema>({
      resolver: zodResolver(profileUpdateSchema),
      mode: 'onChange',
      defaultValues: {
       profilePic:'',
       userName:'',
       about:'',
       location:'',
       timeZone:'',
       extendHours:'',
       addLanguages:'',
       proffessionalTitle:'',
       companyName:'',
      },
    });



  return (
    // <Form  {...form} >
    //   {/* <div className=" w-auto sm:h-auto  flex justify-start container ">
    //   <Card className="  container my-5 sm:w-[25%]  sm:mx-5">
    //     <CardHeader>
    //       <CardHeader className="flex justify-center items-center">
    //         <CardTitle className=" rounded-[60px] border w-[100px] h-[100px] flex justify-center items-center">
    //           <Image
    //             src={ImagePng}
    //             alt="Profile Picture"
    //             width={100}
    //             height={100}
    //           />
    //         </CardTitle>
    //       </CardHeader>

    //       <div className=" grid grid-cols-2 mx-auto">
    //         <span className=" font-bold"> </span>
    //         <button className=" text-xs">
    //           edit
    //         </button>
    //       </div>
    //       <Button className="  mx-3 my-4 sm:w-[200px] rounded-[30px]">
    //         Get In Touch
    //       </Button>
    //       <CardContent>
    //          <p className=' text-xs my-2'> About</p>
    //         <span className='  text-md'> hello world </span>
    //       </CardContent>
    //     </CardHeader>
    //   </Card>
    // </div> */}
    //   {userData?.map((item: { profilePicture: string | undefined; firstName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; },index: React.Key | null | undefined) => (
    //     <div className="flex items-center h-screen    justify-center" key={index}>
    //       <div className="   w-52">
    //         <div className="bg-white shadow-xl rounded-lg py-3 ">
    //           <div className="photo-wrapper p-2">
    //             <img
    //               className="w-32 h-32 rounded-full mx-auto"
    //               src={item.profilePicture}
    //               alt="John Doe"
    //             />
    //           </div>
    //           <div className="p-2">
    //             <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
    //               {item.firstName}
    //             </h3>
    //             <div className="text-center text-gray-400 text-xs font-semibold">
    //               <button className=" bg-black text-white p-2 rounded-[20px]">
    //                 Get IN Touch{' '}
    //               </button>
    //             </div>
    //             <div>
    //               {/* <p className=" text-xs">about </p> */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
          
    //     </div>
    //   ))}
    // </Form>
    <h1>hii</h1>
   
  );
};

export default Profile;

// type EditProps = {
//   firstName: string;
//   lastName: string;
// };

// const Edit = ({ firstName, lastName }: EditProps) => {
//   return (
//     <>
//       <div className=" w-auto grid grid-cols-1 my-1">
//         <Input
//           type="text"
//           placeholder={firstName}
//           value={firstName}
//           className=" w-auto sm:w-[250px] my-1 sm:mx-1 "
//         ></Input>
//         <Input
//           type="text"
//           placeholder={lastName}
//           value={lastName}
//           className="  w-auto sm:w-[250px] my-1 sm:mx-1 "
//         ></Input>
//       </div>
//       <div className=" grid grid-cols-2  gap-2 w-[250px] ">
//         <Button className=" w-auto sm:w-[100px] mx-2  my-2">Cancel</Button>
//         <Button className=" w-auto   sm:w-[100px] mx-2 my-2">S    ave</Button>
//       </div>
//     </>
//   );
// };
