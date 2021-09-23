import { useNotification } from '@/stores/notifications';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';
import { SyntheticEvent, useEffect, useState } from 'react';

export function Notifications() {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<{
    message: string;
    severity: Color;
    timestamp: number;
  }>();

  const notifications = useNotification((s) => s.notifications);
  const dismissNotification = useNotification((s) => s.dismissNotification);

  useEffect(() => {
    if (notifications.length && !messageInfo) {
      const { message, severity } = notifications[0];
      setMessageInfo({ message, severity, timestamp: new Date().getTime() });
      dismissNotification();
      setOpen(true);
    } else if (notifications.length && messageInfo !== undefined && open) {
      setOpen(false);
    }
  }, [notifications, open, messageInfo]);

  const handleClose = (
    _: SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      key={messageInfo ? messageInfo.timestamp : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{
        onExited: handleExited,
      }}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={messageInfo?.severity}
      >
        {messageInfo?.message}
      </Alert>
    </Snackbar>
  );
}
