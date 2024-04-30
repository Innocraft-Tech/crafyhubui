'use client';
import UserNav from '@/components/ui/usernav';
import { playlists } from '@/data/playlists';

import React, { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Filters } from '../discover/components/filters';
import { JobsCard } from '../jobs/components/card';
import { Button } from '@/components/ui/button';
import SettingsComponent from '@/app/(user)/settings/email-preferences/page';
import HobbieProject from '@/assets/hobbieproject.webp';
import Image from 'next/image';
import Link from 'next/link';

const FilePage = () => {

  return (
    <>
      <div className=" md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} />

              <div className=" w-[80%]  flex justify-center items-center col-span-4">
                <div className=" mx-4  w-full px-5 py-5 grid grid-cols-2">
                  <div className="image  flex justify-center  mx-4 border rounded-[30px]  px-5 py-5">
                    <Image
                      src={HobbieProject}
                      alt="hobbie project"
                      className="  "
                      width={350}
                    />
                  </div>
                  <div className="text rounded-[30px]  mx-4  border flex justify-center items-center px-5 py-5">
                    <div >
                    <h3 className=" font-bold my-1">Kick off a project</h3>
                    <p className=' my-3 text-xs'>Start a project with someone you know, or post a job and get matched with top contractors</p>
                    <Link href="/proposel">
                    <button className="  px-7 py-3 bg-black text-xs font-bold text-white rounded-[20px]">
                      Start Project{' '}
                    </button>
                    </Link>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilePage;
