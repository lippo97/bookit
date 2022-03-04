import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@material-ui/core';

import { useState } from 'react';

interface BaseProps<C extends React.ElementType> {
  readonly as?: C;
  readonly id: any;
  readonly title: string;
  readonly description: string;
  readonly isOpen: boolean;
  readonly autoClose?: boolean;
  setOpen(open: boolean): void;
  onConfirm(): void;
}

type DialogButtonProps<C extends React.ElementType> = BaseProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof BaseProps<C>>;

export function DialogButton<C extends React.ElementType>({
  as,
  id,
  title,
  description,
  onConfirm,
  isOpen,
  setOpen,
  autoClose,
  ...innerProps
}: //   ...props
DialogButtonProps<C>) {
  const Component = as ?? 'button';

  const htmlTitle = `alert-dialog-title-${id}`;
  const htmlDesc = `alert-dialog-description-${id}`;
  return (
    <>
      <Component onClick={() => setOpen(true)} {...innerProps} />
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        aria-describedby={htmlDesc}
        aria-labelledby={htmlTitle}
      >
        <DialogTitle id={htmlTitle}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={htmlDesc}>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              autoClose && setOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
