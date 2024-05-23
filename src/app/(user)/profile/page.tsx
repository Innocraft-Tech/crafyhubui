'use client';
import React, { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { useGetUserQuery } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ImagePng from '@/assets/hummans-1.gif';
const Profile = () => {
  const userToken = Cookies.get('access_token');

  const dataOfUser = useGetUserQuery(userToken ? userToken : '').data?.user;
  console.log('Userdata', dataOfUser);

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
    <div>
      <Card className="w-[350px] mx-5">
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
          {/* <Dialog>
            <DialogTrigger asChild className="flex justify-center items-center">
              <div className=" hover:bg-slate-100   mx-auto h-[50px] grid grid-cols-2  justify-center ">
                <p className="mx-1"> {firstName}</p>
                <h1 className="mx-1">edit</h1>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    firstName
                  </Label>
                  <Input
                    id="name"
                    value={firstName}
                    className="col-span-3"
                    onChange={(event) => handleNameChange(event)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    LastName
                  </Label>
                  <Input
                    id="username"
                    value={lastName}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          <div className=" grid grid-cols-2 mx-auto">
            <span> {updateName}</span>
            <button onClick={() => editText(firstName)}>edit</button>
          </div>
          <Button className=" mx-auto w-[200px] rounded-[30px]">
            {' '}
            Get In Touch
          </Button>
          <CardContent></CardContent>
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
      <div className="grid grid-cols-2  w-[300px] items-center  ">
        <Input
          type="text"
          placeholder={firstName}
          value={firstName}
          className="  w-[150px]  mx-1 "
        ></Input>
        <Input
          type="text"
          placeholder={lastName}
          value={lastName}
          className=" w-[150px] mx-1 "
        ></Input>
      </div>
      <div className=" grid grid-cols-2 mx-auto items-center  ">
        <Button className="  mx-1 my-2"> Cancel</Button>
        <Button className="  mx-1 my-2"> save</Button>
      </div>
    </>
  );
};
