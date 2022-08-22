import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { FC, forwardRef } from 'react';
import CloseIcon from '@material-ui/icons/ExpandMore';
import { ReservationFloorPlan } from '@/features/libraries/components/ReservationFloorPlan';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { WithId } from '@asw-project/shared/data/withId';
import { useQuery } from 'react-query';
import { getReservationsOnRoom } from '@/features/libraries/api/reservations';
import { Skeleton } from '@material-ui/lab';

interface ViewDialogProps {
  readonly open: boolean;
  readonly data?: WithId<Reservation>;
  onClose(): void;
}

const Transition = forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(2),
  },
  appbar: {
    position: 'relative',
  },
  title: {
    flex: 1,
    marginLeft: theme.spacing(2),
  },
}));

export const ViewDialog: FC<ViewDialogProps> = ({
  onClose,
  open,
  data: reservationData,
}) => {
  const classes = useStyles();
  const { data, status } = useQuery(
    ['seatGrid', reservationData?._id],
    () => {
      const stringTimeSlot = `${reservationData!.timeSlot.from}-${
        reservationData!.timeSlot.to
      }`;
      return getReservationsOnRoom(
        reservationData!.date,
        reservationData!.roomId,
        stringTimeSlot,
      );
    },
    {
      enabled: reservationData !== undefined,
    },
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        className: classes.dialogPaper,
      }}
    >
      <Box>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              View
            </Typography>
          </Toolbar>
        </AppBar>
        <Box my={2}>
          <Container maxWidth="md">
            {
              // eslint-disable-next-line no-nested-ternary
              status === 'success' ? (
                <ReservationFloorPlan
                  seatGrid={data!}
                  selected={reservationData!.seatId}
                />
              ) : status === 'loading' ? (
                <Skeleton variant="rect" width="100%" />
              ) : (
                <Typography>
                  Couldn&apos;t find the content you&apos;re looking for
                </Typography>
              )
            }
          </Container>
        </Box>
      </Box>
      <Container maxWidth="md">
        <Button fullWidth variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Container>
    </Dialog>
  );
};
