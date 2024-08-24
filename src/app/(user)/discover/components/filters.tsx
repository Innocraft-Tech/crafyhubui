'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  useFilterCategoryMutation,
  useFilterLocationMutation,
  useFilterRoleMutation,
} from '@/redux/api/filterApi';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
const filterList = [
  'Adobe XD',
  'Canva',
  'React',
  'Illustrator',
  'UX Designer',
  'Graphic Design',
  'UI designer',
  'Photoshop',
  'Web Design',
  'Figma',
  'JS',
];
const filterSheets = ['Filters', 'Location', 'Rate'] as const;
type FilterSheets = (typeof filterSheets)[number];
interface FiltersProps {
  category: string[];
  setCategory: (updater: (categories: string[]) => string[]) => void;
  roles: string[]; // Array of strings
  setRoles: (roles: string[]) => void;
  locationArray: string[]; // Add this line
  setLocations: (locationArray: string[]) => void; // Add this line
}

export const Filters: React.FC<FiltersProps> = ({
  category,
  setCategory,
  roles,
  setRoles,
  locationArray,
  setLocations,
}) => {
  // Updated state to track multiple selected categories
  const [filterRole, { data, error, isLoading }] = useFilterRoleMutation();
  const [filterCategory] = useFilterCategoryMutation();
  const [inputValueRole, setInputValueRole] = useState('');
  const [inputValueLocation, setInputValueLocation] = useState('');
  const [
    filterLocation,
    { isLoading: LocationLoading, error: locationError, data: PostLocation },
  ] = useFilterLocationMutation();

  const router = useRouter();
  const toggleCategory = (categoryToToggle: string) => {
    setCategory((prevCategories: string[]) =>
      prevCategories.includes(categoryToToggle)
        ? prevCategories.filter((item) => item !== categoryToToggle)
        : [...prevCategories, categoryToToggle],
    );
  };

  const handleKeyDownRole = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key === ',') {
      e.preventDefault();
      const newRole = inputValueRole.trim();
      if (newRole && !roles.includes(newRole)) {
        // Check if the role is not already added
        const updatedRoles = [...roles, newRole];
        setRoles(updatedRoles);
        setInputValueRole(''); // Clear the input field after adding the role
      }
    }
  };

  const handleKeyDownLocation = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key === ',') {
      e.preventDefault();
      const newLocation = inputValueLocation.trim();
      if (newLocation && !locationArray.includes(newLocation)) {
        // Check if the role is not already added
        const updatedLocation = [...locationArray, newLocation];
        setLocations(updatedLocation);
        setInputValueLocation(''); // Clear the input field after adding the role
      }
    }
  };
  const handleInputChangeRole = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValueRole(e.target.value);
  };
  const handleLinkClick = () => {
    router.push('/jobs/newpost');
  };

  const handleInputChangeLocation = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValueLocation(e.target.value);
  };

  const handleFilterCategory = async () => {
    try {
      // Pass the selected categories as an argument to filterCategory

      await filterCategory(category).unwrap();
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };
  const handleIconClickRole = async () => {
    try {
      const response = await filterRole(roles).unwrap();
      console.log('Filtered users:', response);
    } catch (error) {
      console.error('Failed to filter roles:', error);
    }
  };
  const handleIconClickLocation = async () => {
    try {
      const response = await filterLocation(locationArray).unwrap();
      console.log('Filtered users:', response);
    } catch (error) {
      console.error('Failed to filter roles:', error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleIconClickRole();
    handleFilterCategory();
    handleIconClickLocation();
  };

  return (
    <>
      <div className="crafy_filters bg-white p-4 md:p-5">
        {filterSheets.map((side, index) => (
          <Sheet key={index}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="mx-2 mb-2 w-full sm:mx-2 sm:mb-0 sm:w-auto"
              >
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M32,80a8,8,0,0,1,8-8H72a8,8,0,0,1,0,16H40A8,8,0,0,1,32,80Zm184,88H176V152a8,8,0,0,0-16,0v48a8,8,0,0,0,16,0V184h40a8,8,0,0,0,0-16Zm-80,0H40a8,8,0,0,0,0,16h96a8,8,0,0,0,0-16Zm-32-56a8,8,0,0,0,8-8V88H216a8,8,0,0,0,0-16H112V56a8,8,0,0,0-16,0v48A8,8,0,0,0,104,112Z"></path>
                </svg>
                <p className="w-full">{side}</p>
              </Button>
            </SheetTrigger>

            <SheetContent className="w-full max-w-md md:max-w-xl">
              <form onSubmit={handleSubmit}>
                <SheetHeader>
                  <SheetTitle>All Filters ({category.length})</SheetTitle>
                  <div className="h-[1px] w-full shrink-0 bg-border"></div>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <h4 className="text-md font-normal">
                      Category (Select one or more)
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
                    {filterList.map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`mx-1 rounded-xl px-3 font-light sm:mx-0 sm:px-5 ${
                          category.includes(item)
                            ? 'bg-[#ff0055] text-white'
                            : ''
                        }`}
                        onClick={() => toggleCategory(item)}
                        type="button"
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                  <div className="h-[1px] w-full shrink-0 bg-border"></div>

                  <div className="grid w-full items-center gap-4 sm:grid-cols-2">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="locations" className="font-medium">
                        Location
                      </Label>
                      <div className="my-4">
                        <Input
                          id="locations"
                          value={inputValueLocation}
                          onChange={handleInputChangeLocation}
                          onKeyDown={handleKeyDownLocation}
                          placeholder="Enter locations"
                          className="rounded-xl border border-gray-300 px-2 py-2"
                        />

                        <span
                          className="inset-y-0 right-0 flex cursor-pointer items-center pl-3 pr-2 text-gray-500"
                          style={{ color: '#ff0055' }}
                          onClick={handleIconClickLocation}
                        ></span>
                      </div>
                    </div>

                    <div className="relative flex flex-col space-y-1.5">
                      <Label htmlFor="roles" className="font-medium">
                        Roles
                      </Label>
                      <div className="my-4">
                        <Input
                          id="roles"
                          placeholder="Enter roles"
                          value={inputValueRole}
                          onChange={handleInputChangeRole}
                          onKeyDown={handleKeyDownRole}
                          className="rounded-xl border border-gray-300 px-2 py-2 pr-4"
                        />

                        <FaUpload
                          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pl-3 pr-2"
                          color="#ff0055"
                          onClick={handleIconClickRole}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid items-center justify-start md:grid-cols-2">
                    <span className="mx-1">
                      {locationArray.length > 0 ? (
                        <div className="flex flex-wrap">
                          <span className="my-2 text-sm font-bold md:my-3">
                            Location:
                          </span>
                          {locationArray.map((location, index) => (
                            <span
                              key={index}
                              className="mx-2 my-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-light text-gray-700"
                            >
                              {location}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs font-light">
                          Eg: chennai, bengaluru
                        </span>
                      )}
                    </span>
                    <span className="mx-1">
                      {' '}
                      {roles.length > 0 ? (
                        <div className="mt-2 flex flex-wrap">
                          <span className="my-2 text-sm font-bold"> Role:</span>
                          {roles.map((role, index) => (
                            <span
                              key={index}
                              className="mx-2 my-1 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-light text-gray-700"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs font-light">
                          Eg: ui, react
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        ))}
        <Button
          variant="outline"
          onClick={handleLinkClick}
          className="mx-2 mb-2 w-full sm:mx-2 sm:mb-0 sm:w-auto"
        >
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
          <p className="w-full">Post New Job</p>
        </Button>
      </div>
    </>
  );
};
