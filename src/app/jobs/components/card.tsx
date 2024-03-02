import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function JobsCard() {
  return (
    <div className="lg:grid px-5 py-1 discoverUsers">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
        <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
          <div className="project-description my-3">
            <span className="text-sm font-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </span>
          </div>
          <div className="shrink-0 bg-border h-[1px] w-full"></div>
          <span className="text-xs text-slate-500 flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="text-slate-500"
              viewBox="0 0 256 256"
            >
              <path d="M134,80v44.6l37.09,22.25a6,6,0,0,1-6.18,10.3l-40-24A6,6,0,0,1,122,128V80a6,6,0,0,1,12,0Zm90-22a6,6,0,0,0-6,6V87.36c-7.48-8.83-14.94-17.13-23.53-25.83a94,94,0,1,0-1.95,134.83,6,6,0,0,0-8.24-8.72A82,82,0,1,1,186,70c9.24,9.36,17.18,18.3,25.31,28H184a6,6,0,0,0,0,12h40a6,6,0,0,0,6-6V64A6,6,0,0,0,224,58Z"></path>
            </svg>
            15hrs ago
          </span>
        </Card>
        <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
          <div className="project-description my-3">
            <span className="text-sm font-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </span>
          </div>
          <div className="shrink-0 bg-border h-[1px] w-full"></div>
          <span className="text-xs text-slate-500 flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="text-slate-500"
              viewBox="0 0 256 256"
            >
              <path d="M134,80v44.6l37.09,22.25a6,6,0,0,1-6.18,10.3l-40-24A6,6,0,0,1,122,128V80a6,6,0,0,1,12,0Zm90-22a6,6,0,0,0-6,6V87.36c-7.48-8.83-14.94-17.13-23.53-25.83a94,94,0,1,0-1.95,134.83,6,6,0,0,0-8.24-8.72A82,82,0,1,1,186,70c9.24,9.36,17.18,18.3,25.31,28H184a6,6,0,0,0,0,12h40a6,6,0,0,0,6-6V64A6,6,0,0,0,224,58Z"></path>
            </svg>
            15hrs ago
          </span>
        </Card>
        <Card className="rounded-2xl p-5 my-2">
          <div className="flex items-center">
            <Avatar className="w-16 h-16 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
          <div className="project-description my-3">
            <span className="text-sm font-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </span>
          </div>
          <div className="shrink-0 bg-border h-[1px] w-full"></div>
          <span className="text-xs text-slate-500 flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="text-slate-500"
              viewBox="0 0 256 256"
            >
              <path d="M134,80v44.6l37.09,22.25a6,6,0,0,1-6.18,10.3l-40-24A6,6,0,0,1,122,128V80a6,6,0,0,1,12,0Zm90-22a6,6,0,0,0-6,6V87.36c-7.48-8.83-14.94-17.13-23.53-25.83a94,94,0,1,0-1.95,134.83,6,6,0,0,0-8.24-8.72A82,82,0,1,1,186,70c9.24,9.36,17.18,18.3,25.31,28H184a6,6,0,0,0,0,12h40a6,6,0,0,0,6-6V64A6,6,0,0,0,224,58Z"></path>
            </svg>
            15hrs ago
          </span>
        </Card>
      </div>
    </div>
  )
}
