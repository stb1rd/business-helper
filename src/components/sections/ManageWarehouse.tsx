import { useState } from 'react';

import { Chevron } from '@/components/ui/Chevron';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WarehousePlot } from '@/components/widgets/PaletteInstructions/WarehousePlot';
import { WarehouseMeta } from '@/components/widgets/WarehouseMeta';

export const ManageWarehouse = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending, error, submittedAt } = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append('file', file![0]);
      const response = await fetch('https://vaambival-want-back-1c8f.twc1.net/rest/warehouse/structure', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении склада. Проверьте данные и попробуйте еще раз.');
      }

      const result = await response.json();
      queryClient.setQueryData(['warehouse'], result);
      setFile(null);
    },
    onError: () => {
      // @ts-expect-error y tho
      document?.getElementById('wh_error_modal')?.showModal();
    },
  });

  return (
    <>
      <div className="paper">
        <div className="flex gap-2 justify-between items-center interactive" onClick={() => setIsOpen(!isOpen)}>
          <h2 className="text-2xl">Схема склада</h2>
          <Chevron isOpen={isOpen} />
        </div>
        {isOpen && (
          <>
            <div className="flex gap-3 w-full">
              <div className="flex flex-col gap-2  grow">
                <h3 className="text-xl">Текущая</h3>
                <div className="flex gap-2 items-start">
                  <WarehousePlot />
                  <WarehouseMeta />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl">Обновить</h3>
                <input type="file" className="file-input" onChange={(e) => setFile(e.target.files)} />
                <button className="btn btn-primary w-xs" disabled={!file || isPending} onClick={() => mutate()}>
                  {isPending ? <span className="loading loading-spinner" /> : 'Обновить склад'}
                </button>
                {Boolean(submittedAt) && (
                  <div>
                    Последнее обновление:
                    <br />
                    {new Date(submittedAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <dialog id="wh_error_modal" className="modal">
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
    </>
  );
};
