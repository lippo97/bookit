import { useOpenClose } from '@/hooks/useOpenClose';
import { Box, Button, Fade, Modal, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ModalButtonProps<T> {
  children: React.ReactNode;
  onChange: (data: T) => boolean | void;
  modalContent: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2, 4),
  },
}));

export function ModalButton<T>({
  children,
  onChange,
  modalContent,
}: ModalButtonProps<T>) {
  const [isOpen, handleOpen, handleClose] = useOpenClose();
  const classes = useStyles();
  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {children}
      </Button>
      <Modal className={classes.modal} open={isOpen} onClose={handleClose}>
        <Fade in={isOpen}>
          <Paper className={classes.paper} elevation={2}>
            {modalContent}
            <div>ciaooooooooo</div>
            <div>ciaooooooooo</div>
            <div>ciaooooooooo</div>
            <div>ciaooooooooo</div>
            <div>ciaooooooooo</div>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
