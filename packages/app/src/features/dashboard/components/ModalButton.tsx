import { useOpenClose } from '@/hooks/useOpenClose';
import { ControllableModalButton } from './ControllableModalButton';

interface ModalButtonProps {
  buttonClassName?: string;
  children: React.ReactNode;
  modalContent: React.ReactNode;
  onChange: () => void | Promise<void>;
  title: string;
}

export function ModalButton(props: ModalButtonProps) {
  const [isOpen, handleOpen, handleClose] = useOpenClose();
  return (
    <ControllableModalButton
      {...props}
      open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
}
