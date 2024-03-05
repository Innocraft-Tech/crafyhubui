import { Button } from '@/components/ui/button';
import UserNav from '@/components/ui/usernav';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
const Filter_Sheets = ['Filters', 'Location', 'Rate'] as const;

type FilterSheets = (typeof Filter_Sheets)[number];

export const Filters = () => {
  return (
    <div className="crafy_filters px-5 py-5 bg-white">
      {Filter_Sheets.map((side) => (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mx-2">
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
              <div className="shrink-0 bg-border h-[1px] w-full"></div>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <h4 className="text-md font-normal">Category (Select one)</h4>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                {filterList.map((item) => (
                  <Button
                    variant="outline"
                    className="mx-1 px-5 font-light rounded-xl"
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="shrink-0 bg-border h-[1px] w-full"></div>
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
              <div className="shrink-0 bg-border h-[1px] w-full"></div>
              <div className="grid grid-cols-1 items-center gap-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Hourly Rate</Label>
                    <Input id="name" placeholder="$30" className="rounded-xl" />
                  </div>
                </div>
              </div>
              <div className="shrink-0 bg-border h-[1px] w-full"></div>
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
  );
};
