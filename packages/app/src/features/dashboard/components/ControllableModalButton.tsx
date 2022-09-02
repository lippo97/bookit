import { useOpenClose } from '@/hooks/useOpenClose';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

interface ControllableModalButtonProps {
  buttonClassName?: string;
  children: React.ReactNode;
  modalContent: React.ReactNode;
  onChange: () => void | Promise<void>;
  title: string;
  open: boolean;
  onOpen(): void;
  onClose(): void;
}

export function ControllableModalButton({
  children,
  modalContent,
  onChange,
  title,
  buttonClassName,
  open,
  onOpen,
  onClose,
}: ControllableModalButtonProps) {
  return (
    <>
      <Button variant="outlined" onClick={onOpen} className={buttonClassName}>
        {children}
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{modalContent}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const res = onChange();
              if (res !== undefined) {
                res.then(() => {
                  onClose();
                });
              } else {
                onClose();
              }
            }}
            color="primary"
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
