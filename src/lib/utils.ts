import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export function checkProfileComplete({
  profilePicture,
  perHourValue,
  firstName,
  lastName,
  bio,
  timezone,
  userLocation,
  tools,
}: User) {
  const profileFields = [
    profilePicture,
    perHourValue,
    firstName,
    lastName,
    bio,
    timezone,
    userLocation,
    tools,
  ];
  const filledFieldsCount = profileFields.filter((field) => field).length;
  const totalFieldsCount = profileFields.length;
  const percentage = (filledFieldsCount / totalFieldsCount) * 100;

  return percentage;
}
