import { fetchProgress } from '@/lib/api';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './input';
import RadialProgress from './progress';

interface ImageUploadProps {
  onUpload: (fileUrl: string) => void;
  placeholder?: string;
}

const ImageUpload = ({ onUpload, placeholder }: ImageUploadProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const [selectedImagePath, setSelectedImagePath] = useState<string>('');

  const onUploadProgress = (progressEvent: any) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );

    setProgress(percentage);
  };

  const removeSelectedImage = () => {
    setLoading(false);
    setSelectedImagePath('');
  };

  const handleImageUpload = async (image: File) => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('filename', image);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URI}upload`;
    const ops = {
      method: 'POST',
      body: formData,
    };

    fetchProgress(url, ops, onUploadProgress)
      .then((res) => {
        const response = JSON.parse(res);

        setSelectedImagePath(response.downloadURL);

        onUpload(response.downloadURL);
      })
      .finally(() => {
        setLoading(false);
      });

    return;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedImage = acceptedFiles[0];

      handleImageUpload(selectedImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedImage = event.target.files[0];

      handleImageUpload(selectedImage);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex w-full items-center justify-center"
    >
      <label
        htmlFor="dropzone-file"
        className="dark:hover:bg-bray-800 relative flex w-full flex-none cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-6 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {loading && (
          <div className="max-w-md text-center">
            <RadialProgress progress={progress} />
            <p className="text-sm font-semibold">Uploading Picture</p>
            <p className="text-xs text-gray-400">
              Do not refresh or perform any other action while the picture is
              being upload
            </p>
          </div>
        )}

        {!loading && !selectedImagePath && (
          <div className="text-center">
            <div className="mx-auto max-w-min rounded-md border p-2">
              {/* <IoCloudUploadOutline size="1.6em" /> */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_600_1454)">
                  <path
                    d="M19 4H18.492L16.308 1.168C16.0265 0.805806 15.6663 0.512417 15.2547 0.310054C14.843 0.107691 14.3907 0.00166304 13.932 0L10.068 0C9.6093 0.00166304 9.15699 0.107691 8.74533 0.310054C8.33368 0.512417 7.97347 0.805806 7.692 1.168L5.508 4H5C3.67441 4.00159 2.40356 4.52888 1.46622 5.46622C0.528882 6.40356 0.00158786 7.67441 0 9L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V9C23.9984 7.67441 23.4711 6.40356 22.5338 5.46622C21.5964 4.52888 20.3256 4.00159 19 4ZM9.276 2.39C9.36967 2.26905 9.48969 2.17106 9.62693 2.10348C9.76418 2.0359 9.91502 2.00051 10.068 2H13.932C14.085 2.00066 14.2357 2.03611 14.373 2.10368C14.5102 2.17125 14.6302 2.26916 14.724 2.39L15.966 4H8.034L9.276 2.39ZM22 19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V9C2 8.20435 2.31607 7.44129 2.87868 6.87868C3.44129 6.31607 4.20435 6 5 6H19C19.7956 6 20.5587 6.31607 21.1213 6.87868C21.6839 7.44129 22 8.20435 22 9V19Z"
                    fill="#455A64"
                  />
                  <path
                    d="M12 8C10.8133 8 9.65328 8.35189 8.66658 9.01118C7.67989 9.67047 6.91085 10.6075 6.45673 11.7039C6.0026 12.8003 5.88378 14.0067 6.11529 15.1705C6.3468 16.3344 6.91825 17.4035 7.75736 18.2426C8.59648 19.0818 9.66558 19.6532 10.8295 19.8847C11.9933 20.1162 13.1997 19.9974 14.2961 19.5433C15.3925 19.0892 16.3295 18.3201 16.9888 17.3334C17.6481 16.3467 18 15.1867 18 14C17.9984 12.4092 17.3658 10.884 16.2409 9.75911C15.116 8.63424 13.5908 8.00159 12 8ZM12 18C11.2089 18 10.4355 17.7654 9.77772 17.3259C9.11993 16.8864 8.60723 16.2616 8.30448 15.5307C8.00173 14.7998 7.92252 13.9956 8.07686 13.2196C8.2312 12.4437 8.61217 11.731 9.17158 11.1716C9.73099 10.6122 10.4437 10.2312 11.2196 10.0769C11.9956 9.92252 12.7998 10.0017 13.5307 10.3045C14.2616 10.6072 14.8864 11.1199 15.3259 11.7777C15.7654 12.4355 16 13.2089 16 14C16 15.0609 15.5786 16.0783 14.8284 16.8284C14.0783 17.5786 13.0609 18 12 18Z"
                    fill="#455A64"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_600_1454">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{placeholder}</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-400">
              Click to upload &#40; image should be 300x300 px & under 5 MB
              &#41;
            </p>
          </div>
        )}

        {selectedImagePath && !loading && (
          <div className="text-center">
            <Image
              width={1000}
              height={1000}
              src={selectedImagePath}
              className="mx-auto mb-3 mt-2 max-h-16 w-full object-contain opacity-70"
              alt="uploaded image"
            />

            <p className="text-sm font-semibold">Picture Uploaded</p>
            <p className="text-xs text-gray-400">
              Click here to reupload the picture
            </p>
          </div>
        )}
      </label>

      <Input
        {...getInputProps()}
        id="dropzone-file"
        type="file"
        className="hidden"
        disabled={loading || selectedImagePath !== null}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
