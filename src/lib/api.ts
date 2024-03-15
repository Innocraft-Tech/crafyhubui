interface ErrorResponse {
  status: number;
  data: {
    status: string;
    message: string;
  };
}

export function isMyKnownError(error: any): error is ErrorResponse {
  return (
    error &&
    typeof error === 'object' &&
    //   'status' in error &&
    'data' in error &&
    typeof error.data === 'object' &&
    //   'status' in error.data &&
    'message' in error.data
  );
}

export const SOMETHING_WENT_WRONG = 'Something went wrong!';

export function fetchProgress(
  url: string,
  opts: any = {},
  onProgress?: (event: ProgressEvent<EventTarget>) => void,
): Promise<string> {
  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (const k in opts.headers || {})
      xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = (e) => res((e.target as XMLHttpRequest).responseText);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  });
}

export async function fetchXHR(
  url: any,
  ops: any,
  body: any,
  onUploadProgress: any,
  onSuccess: any,
  onFail: any,
) {
  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      onUploadProgress(event);
    }
  });

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // File upload completed
      // You can handle the response here
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        onSuccess(response);
      } else {
        onFail();
      }
    }
  };

  xhr.open(ops.method, url);

  xhr.send(body);
}
