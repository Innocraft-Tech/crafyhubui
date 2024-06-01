'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

interface ChildComponentProps {
  img?: string;
  onUploadProfile: (fileUrl: string) => void;
}

export default function ProfileImageUpload({
  img,
  onUploadProfile,
}: ChildComponentProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(
    img ?? null,
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('filename', file);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URI}upload`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const downloadURL = response.downloadURL;

        setSelectedImagePath(downloadURL);
        onUploadProfile(downloadURL);
      } else {
        console.error('Error uploading image:', xhr.statusText);
      }
      setLoading(false);
    };

    xhr.onerror = () => {
      console.error('Error uploading image:', xhr.statusText);
      setLoading(false);
    };

    xhr.send(formData);
  };

  return (
    <div className="relative m-auto h-40 w-40">
      {selectedImagePath ? (
        <div
          className="h-40 w-40 rounded-full shadow"
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: `url(${img})`,
          }}
        ></div>
      ) : (
        <Image
          src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          alt="Default Profile"
          width={160}
          height={160}
          className="h-40 w-40 rounded-full shadow"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="profile-image-upload"
      />
      <label
        htmlFor="profile-image-upload"
        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 text-white opacity-0 transition-opacity hover:opacity-100"
      >
        <div className="flex flex-col items-center">
          {/* <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg> */}
          Change Photo
        </div>
      </label>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-75">
          <div className="text-white">
            Uploading: {Math.round(uploadProgress)}%
          </div>
        </div>
      )}
    </div>
  );
}
