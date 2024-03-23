// 'use client';
// import React, { useEffect, useState } from 'react';

// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';

// import { getAllJobs } from '@/app/api/auth/api-helper/index';
// export function JobsCard() {
//   const [jobs, setJobs] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllJobs();
//         setJobs(response);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="lg:grid px-5 py-1 discoverUsers">
//         <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
//           <Card className="rounded-2xl p-5 my-2">
//             <div className="flex items-center">
//               <Avatar className="w-16 h-16 rounded-lg">
//                 <AvatarImage
//                   src="https://github.com/shadcn.png"
//                   alt="@shadcn"
//                 />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//               <div className="mx-3">
//                 <h4 className="font-normal text-xl">Retool Dashboard</h4>
//                 <span className="font-light text-sm"> Google</span>
//               </div>
//             </div>
//             <div className="flex my-5 gap-1 items-center">
//               <span className="text-xs">$25 - $75/hour</span>
//               <Separator orientation="vertical" className="mx-1 h-5" />
//               <span className="text-xs">40hrs/week</span>
//               <Separator orientation="vertical" className="mx-1 h-5" />
//               <span className="text-xs">One-Time</span>
//             </div>
//         </div>
//         <div className="project-description my-3">
//           <span className="text-sm font-light">
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industrys
//           </span>
//         </Card>
//         <Card className="rounded-2xl p-5 my-2">
//           <div className="flex items-center">
//             <Avatar className="w-16 h-16 rounded-lg">
//               <AvatarImage
//                 src="https://github.com/shadcn.png"
//                 alt="@shadcn"
//               />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <div className="mx-3">
//               <h4 className="font-normal text-xl">Retool Dashboard</h4>
//               <span className="font-light text-sm"> Google</span>
//             </div>
//           </div>
//           <div className="flex my-5 gap-1 items-center">
//             <span className="text-xs">$25 - $75/hour</span>
//             <Separator orientation="vertical" className="mx-1 h-5" />
//             <span className="text-xs">40hrs/week</span>
//             <Separator orientation="vertical" className="mx-1 h-5" />
//             <span className="text-xs">One-Time</span>
//           </div>
//       </div>
//       <div className="project-description my-3">
//         <span className="text-sm font-light">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industrys
//         </span>
//       </Card>
//       <Card className="rounded-2xl p-5 my-2">
//         <div className="flex items-center">
//           <Avatar className="w-16 h-16 rounded-lg">
//             <AvatarImage
//               src="https://github.com/shadcn.png"
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <div className="mx-3">
//             <h4 className="font-normal text-xl">Retool Dashboard</h4>
//             <span className="font-light text-sm"> Google</span>
//           </div>
//         </div>
//         <div className="flex my-5 gap-1 items-center">
//           <span className="text-xs">$25 - $75/hour</span>
//           <Separator orientation="vertical" className="mx-1 h-5" />
//           <span className="text-xs">40hrs/week</span>
//           <Separator orientation="vertical" className="mx-1 h-5" />
//           <span className="text-xs">One-Time</span>
//         </div>
//       </div>
//       <div className="project-description my-3">
//         <span className="text-sm font-light">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industrys
//         </span>
//       </Card>
//     </div >
//       </div >
//     <div></div>
//     </>
//   );
// }
'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { getAllJobs } from '@/app/api/auth/api-helper/index';
import { useGetUserQuery } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export function JobsCard() {
  const [jobs, setJobs] = useState({});

  let user_token = Cookies.get('access_token');
  console.log('user_token', typeof user_token);
  const { data: Userdata } = useGetUserQuery(user_token ? user_token : '');
  console.log('Userdata', Userdata);

  return (
    <>
      <div className="lg:grid px-5 py-1 discoverUsers">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
          <Card className="rounded-2xl p-5 my-2">
            <div className="flex items-center">
              <Avatar className="w-16 h-16 rounded-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mx-3">
                <h4 className="font-normal text-xl">Retool Dashboard</h4>
                <span className="font-light text-sm"> Google</span>
              </div>
            </div>
            <div className="flex my-5 gap-1 items-center">
              <span className="text-xs">$25 - $75/hour</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">40hrs/week</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">One-Time</span>
            </div>
          </Card>

          {/* Repeat the above Card and description block for additional cards */}
          <Card className="rounded-2xl p-5 my-2">
            <div className="flex items-center">
              <Avatar className="w-16 h-16 rounded-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mx-3">
                <h4 className="font-normal text-xl">Retool Dashboard</h4>
                <span className="font-light text-sm"> Google</span>
              </div>
            </div>
            <div className="flex my-5 gap-1 items-center">
              <span className="text-xs">$25 - $75/hour</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">40hrs/week</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">One-Time</span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
