import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FileUpload = ({ api, label, onSuccess }: { label: string; api: string; onSuccess?: (data: any) => void }) => {
  const [file, setFile] = useState<FileList | null>(null);

  const { mutate, isPending, error, submittedAt, isSuccess } = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append('file', file![0]);
      const response = await fetch(`https://vaambival-want-back-1c8f.twc1.net/rest/${api}`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Произошла ошибка при попытке ${label.toLowerCase()}. Проверьте данные и попробуйте еще раз.`);
      }

      setFile(null);
      return await response.json();
    },
    onError: () => {
      // @ts-expect-error y tho
      document?.getElementById(`${label}_error_modal`)?.showModal();
      setFile(null);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl">{label}</h3>
      <input type="file" className="file-input" onChange={(e) => setFile(e.target.files)} />
      <button className="btn btn-primary w-xs" disabled={!file || !file.length || isPending} onClick={() => mutate()}>
        {isPending ? <span className="loading loading-spinner" /> : label}
      </button>
      {Boolean(submittedAt && isSuccess) && (
        <div className="stats shadow w-xs">
          <div className="stat text-center">
            <div className="stat-title">Последнее обновление</div>
            <div className="stat-value text-success">{new Date(submittedAt).toLocaleTimeString()}</div>
            <div className="stat-desc">{new Date(submittedAt).toLocaleDateString()}</div>
          </div>
        </div>
      )}
      <dialog id={`${label}_error_modal`} className="modal">
        <div className="modal-box">
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error?.message}</span>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
