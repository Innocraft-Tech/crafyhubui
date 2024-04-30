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
import { useUpdateMeMutation } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ImagePng from '@/assets/hummans-1.gif';

const Profile = () => {
  const router = useRouter();
  const user_token = Cookies.get('access_token')
  console.log(user_token);
  
  console.log("user_token", typeof(user_token))
  const dataOfUser = useUpdateMeMutation(user_token)
  console.log("Userdata",dataOf User)

  const [firstName, setName] = useState('suresh');
  const [lastName, setLastName] = useState('kumar');
  const [updateName, setUpdateName] = useState<string | JSX.Element>(firstName);
  
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  function editText(firstName: string) {
    setUpdateName(
      firstName ? (
        <Edit firstName={firstName} lastName={lastName} />
      ) : (
        firstName
      ),
    );
  }
  return (
    <div className=" w-auto sm:h-auto  flex justify-start container ">
      <Card className="  container my-5 sm:w-[25%]  sm:mx-5">
        <CardHeader>
          <CardHeader className="flex justify-center items-center">
            <CardTitle className=" rounded-[60px] border w-[100px] h-[100px] flex justify-center items-center">
              <Image
                src={ImagePng}
                alt="Profile Picture"
                width={100}
                height={100}
              />
            </CardTitle>
          </CardHeader>

          <div className=" grid grid-cols-2 mx-auto">
            <span className=" font-bold"> {updateName}</span>
            <button className=" text-xs" onClick={() => editText(firstName)}>
              edit
            </button>
          </div>
          <Button className="  mx-3 my-4 sm:w-[200px] rounded-[30px]">
            {' '}
            Get In Touch
          </Button>
          <CardContent>
             <p className=' text-xs my-2'> About</p>
            <span className='  text-md'> hello world</span>

            
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Profile;

type EditProps = {
  firstName: string;
  lastName: string;
};

const Edit = ({ firstName, lastName }: EditProps) => {
  return (
    <>
      <div className=" w-auto grid grid-cols-1 my-1">
        <Input
          type="text"
          placeholder={firstName}
          value={firstName}
          className=" w-auto sm:w-[250px] my-1 sm:mx-1 "
        ></Input>
        <Input
          type="text"
          placeholder={lastName}
          value={lastName}
          className="  w-auto sm:w-[250px] my-1 sm:mx-1 "
        ></Input>
      </div>
      <div className=" grid grid-cols-2  gap-2 w-[250px] ">
        <Button className=" w-auto sm:w-[100px] mx-2  my-2"> Cancel</Button>
        <Button className=" w-auto   sm:w-[100px] mx-2 my-2"> save</Button>
      </div>
    </>
  );
};
