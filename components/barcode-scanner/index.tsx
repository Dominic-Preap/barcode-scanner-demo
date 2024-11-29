'use client';

import 'react-barcode-scanner/polyfill';

import { BarcodeScanner, useTorch } from 'react-barcode-scanner';

import {XMarkIcon,EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';

import { BaseDialog } from './base-dialog';


interface Props {
  open: boolean;
  onClose: () => void;
  onCapture: (value: string) => void;
}

export const BarcodeScannerDialog: React.FC<Props> = props => {
  const { open, onClose, onCapture } = props;
  const [isSupportTorch, isOpen, onTorchSwitch] = useTorch();

  const Icon = isOpen ? EyeSlashIcon : EyeIcon;
  const bulbText = isOpen ? 'Flash Off' : 'Flash On';
  return (
    <BaseDialog open={open} panelClassName="h-dvh w-dvw max-w-none p-0 -m-8 bg-black rounded-none">
      <div className="relative h-full w-full" id="camera-screen">
        <BarcodeScanner
          options={{ delay: 500, formats: ['qr_code', 'code_128'] }}
          onCapture={v => {
            onCapture(v.at(0)?.rawValue || '');
            onClose();
          }}
        />
        <div className="absolute bottom-8 left-1/2 flex space-x-8 -translate-x-1/2">
          <ScannerButton icon={XMarkIcon} onClick={onClose} title="Close" />

          {isSupportTorch && <ScannerButton icon={Icon} onClick={onTorchSwitch} title={bulbText} />}
        </div>
      </div>
    </BaseDialog>
  );
};

interface ScannerButtonProps {
  icon: React.ElementType;
  title: string;
  onClick: () => void;
}

const ScannerButton: React.FC<ScannerButtonProps> = ({ icon: Icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center space-x-2 rounded-full bg-white px-4 py-3 shadow"
  >
    <Icon className="size-6 shrink-0 text-green" />
    <span className="text-nowrap font-medium">{title}</span>
  </button>
);
