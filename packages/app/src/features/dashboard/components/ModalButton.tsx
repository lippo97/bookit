import { useOpenClose } from '@/hooks/useOpenClose';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

interface ModalButtonProps {
  buttonClassName?: string;
  children: React.ReactNode;
  modalContent: React.ReactNode;
  onChange: () => void | Promise<void>;
  title: string;
}

export function ModalButton({
  children,
  modalContent,
  onChange,
  title,
  buttonClassName,
}: ModalButtonProps) {
  const [isOpen, handleOpen, handleClose] = useOpenClose();
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        className={buttonClassName}
      >
        {children}
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{modalContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const res = onChange();
              if (res !== undefined) {
                res.then(() => {
                  handleClose();
                });
              } else {
                handleClose();
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
