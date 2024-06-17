'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

const filterList = [
  'All filters',
  'Architecture',
  'Art Direction',
  'Branding',
  'Fashion',
  'Graphic Design',
  'Illustration',
  'UI/UX',
  'Web Design',
];
const filterSheets = ['Filters', 'Location', 'Rate'] as const;

type FilterSheets = (typeof filterSheets)[number];

export const Filters = () => {
  const router = useRouter();
  const handleLinkClick = () => {
    router.push('/jobs/newpost');
  };
  return (
    <>
      <div className="crafy_filters bg-white px-5 py-5">
        {filterSheets.map((side, index) => (
          <Sheet key={index}>
            <SheetTrigger asChild key={index}>
              <Button variant="outline" className="mx-2" key={index}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="mr-2"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M32,80a8,8,0,0,1,8-8H72a8,8,0,0,1,0,16H40A8,8,0,0,1,32,80Zm184,88H176V152a8,8,0,0,0-16,0v48a8,8,0,0,0,16,0V184h40a8,8,0,0,0,0-16Zm-80,0H40a8,8,0,0,0,0,16h96a8,8,0,0,0,0-16Zm-32-56a8,8,0,0,0,8-8V88H216a8,8,0,0,0,0-16H112V56a8,8,0,0,0-16,0v48A8,8,0,0,0,104,112Z"></path>
                </svg>
                {side}
              </Button>
            </SheetTrigger>
            <SheetContent className="md:max-w-xl">
              <SheetHeader>
                <SheetTitle>All Filters (0)</SheetTitle>
                <div className="h-[1px] w-full shrink-0 bg-border"></div>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-4">
                  <h4 className="text-md font-normal">Category (Select one)</h4>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  {filterList.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="mx-1 rounded-xl px-5 font-light"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                <div className="h-[1px] w-full shrink-0 bg-border"></div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Tools</Label>
                      <Input
                        id="name"
                        placeholder="Name of your project"
                        className="rounded-xl"
                      />
                      <span className="text-xs font-light">
                        Eg: Figma, Photoshop
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Roles</Label>
                      <Input
                        id="name"
                        placeholder="Name of your project"
                        className="rounded-xl"
                      />
                      <span className="text-xs font-light">
                        Eg: UX Designer, Product Designer
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] w-full shrink-0 bg-border"></div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Hourly Rate</Label>
                      <Input
                        id="name"
                        placeholder="$30"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="h-[1px] w-full shrink-0 bg-border"></div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Locations</Label>
                      <Input
                        id="name"
                        placeholder="India"
                        className="rounded-xl"
                      />
                      <span className="text-xs font-light">
                        Eg: US, India, UK, Russia
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Languages</Label>
                      <Input
                        id="name"
                        placeholder="Add upto two languages"
                        className="rounded-xl"
                      />
                      <span className="text-xs font-light">
                        Eg: English, Spanish, Tamil
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" className="my-5">
                    View Results
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </>
  );
};
