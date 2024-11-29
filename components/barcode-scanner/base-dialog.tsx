import { Dialog, Transition } from '@headlessui/react';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';

type Props = React.PropsWithChildren<{
  panelClassName?: string;
  open: boolean;
  onClose?: () => void;
  onEscapeKeyDown?: (v: boolean) => void;
}>;

export const BaseDialog: React.FC<Props> = ({ children, open, panelClassName, onClose, onEscapeKeyDown }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={v => onEscapeKeyDown?.(v)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* overflow-y-auto */}
        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  // 'overflow-hidden'
                  'relative w-full max-w-sm rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all transform',
                  panelClassName
                )}
              >
                {/*--- close dialog ---*/}
                {onClose && (
                  <div className="absolute -right-2 -top-12 lg:-right-6">
                    <button type="button" className="text-white outline-none" onClick={onClose}>
                      <span className="sr-only">Close</span>
                      <XCircleIcon className="size-10" aria-hidden="true" />
                    </button>
                  </div>
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
