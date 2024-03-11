import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProjectSlider } from '@/components/ui/carousel';
import { getAllUsers } from '@/app/api/auth/api-helper';

export function DiscoverCard() {
  const [users,setUsers] = React.useState<any[]>([])
  React.useEffect(()=>{
    getAllUsers().then((data)=>setUsers(data)).catch((err)=>console.log(err))
    console.log(users)
  },[])
  return (
    <div className="lg:grid px-5 py-5 discoverUsers">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {users.map((user:any)=>
          <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.profilePicture} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mx-3">
              <h4 className="font-medium">{user.firstName} {user.lastName}</h4>
              <span className="font-light">New Jersey</span>
            </div>
          </div>
          <div className="flex my-5 gap-3">
            <Badge variant="secondary" className="p-2 font-normal">
              $25 - $75/hour
            </Badge>
            <Badge variant="secondary" className="p-2 font-normal bg-green-300">
              Available
            </Badge>
          </div>
          <div className="grid">
            <div className="grid grid-cols-4 items-center gap-4">
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Blender
              </Badge>
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Figma
              </Badge>
            </div>
          </div>
          <div className="project-carousel">
            <ProjectSlider />
          </div>
          <Button variant="default" className="rounded-xl w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.88l85.61,40.55a2.08,2.08,0,0,1,.95.95L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a1.88,1.88,0,0,1-1.76,1.45,1.86,1.86,0,0,1-2-1.14l-40-84.36,48.24-48.24a6,6,0,1,0-8.49-8.49L107.52,140,23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"></path>
            </svg>{' '}
            Get In Touch
          </Button>
        </Card>
        )}
        {/* <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mx-3">
              <h4 className="font-medium">James C</h4>
              <span className="font-light">New Jersey</span>
            </div>
          </div>
          <div className="flex my-5 gap-3">
            <Badge variant="secondary" className="p-2 font-normal">
              $25 - $75/hour
            </Badge>
            <Badge variant="secondary" className="p-2 font-normal bg-green-300">
              Available
            </Badge>
          </div>
          <div className="grid">
            <div className="grid grid-cols-4 items-center gap-2">
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Blender
              </Badge>
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Figma
              </Badge>
            </div>
          </div>
          <div className="project-carousel">
            <ProjectSlider />
          </div>
          <Button variant="default" className="rounded-xl w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.88l85.61,40.55a2.08,2.08,0,0,1,.95.95L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a1.88,1.88,0,0,1-1.76,1.45,1.86,1.86,0,0,1-2-1.14l-40-84.36,48.24-48.24a6,6,0,1,0-8.49-8.49L107.52,140,23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"></path>
            </svg>{' '}
            Get In Touch
          </Button>
        </Card>
        <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mx-3">
              <h4 className="font-medium">James C</h4>
              <span className="font-light">New Jersey</span>
            </div>
          </div>
          <div className="flex my-5 gap-3">
            <Badge variant="secondary" className="p-2 font-normal">
              $25 - $75/hour
            </Badge>
            <Badge variant="secondary" className="p-2 font-normal bg-green-300">
              Available
            </Badge>
          </div>
          <div className="grid">
            <div className="grid grid-cols-4 items-center gap-2">
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Blender
              </Badge>
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Figma
              </Badge>
            </div>
          </div>
          <div className="project-carousel">
            <ProjectSlider />
          </div>
          <Button variant="default" className="rounded-xl w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.88l85.61,40.55a2.08,2.08,0,0,1,.95.95L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a1.88,1.88,0,0,1-1.76,1.45,1.86,1.86,0,0,1-2-1.14l-40-84.36,48.24-48.24a6,6,0,1,0-8.49-8.49L107.52,140,23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"></path>
            </svg>{' '}
            Get In Touch
          </Button>
        </Card>
        <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mx-3">
              <h4 className="font-medium">James C</h4>
              <span className="font-light">New Jersey</span>
            </div>
          </div>
          <div className="flex my-5 gap-3">
            <Badge variant="secondary" className="p-2 font-normal">
              $25 - $75/hour
            </Badge>
            <Badge variant="secondary" className="p-2 font-normal bg-green-300">
              Available
            </Badge>
          </div>
          <div className="grid">
            <div className="grid grid-cols-4 items-center gap-2">
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Blender
              </Badge>
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Figma
              </Badge>
            </div>
          </div>
          <div className="project-carousel">
            <ProjectSlider />
          </div>
          <Button variant="default" className="rounded-xl w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.88l85.61,40.55a2.08,2.08,0,0,1,.95.95L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a1.88,1.88,0,0,1-1.76,1.45,1.86,1.86,0,0,1-2-1.14l-40-84.36,48.24-48.24a6,6,0,1,0-8.49-8.49L107.52,140,23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"></path>
            </svg>{' '}
            Get In Touch
          </Button>
        </Card>
        <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mx-3">
              <h4 className="font-medium">James C</h4>
              <span className="font-light">New Jersey</span>
            </div>
          </div>
          <div className="flex my-5 gap-3">
            <Badge variant="secondary" className="p-2 font-normal">
              $25 - $75/hour
            </Badge>
            <Badge variant="secondary" className="p-2 font-normal bg-green-300">
              Available
            </Badge>
          </div>
          <div className="grid">
            <div className="grid grid-cols-4 items-center gap-2">
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Blender
              </Badge>
              <Badge
                variant="secondary"
                className="p-2 font-normal text-center rounded-md justify-center"
              >
                Figma
              </Badge>
            </div>
          </div>
          <div className="project-carousel">
            <ProjectSlider />
          </div>
          <Button variant="default" className="rounded-xl w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.88l85.61,40.55a2.08,2.08,0,0,1,.95.95L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a1.88,1.88,0,0,1-1.76,1.45,1.86,1.86,0,0,1-2-1.14l-40-84.36,48.24-48.24a6,6,0,1,0-8.49-8.49L107.52,140,23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"></path>
            </svg>{' '}
            Get In Touch
          </Button>
        </Card> */}
      </div>
    </div>
  );
}
