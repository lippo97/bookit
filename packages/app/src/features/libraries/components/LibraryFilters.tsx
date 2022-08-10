import { Service } from '@asw-project/shared/generatedTypes';
import { services } from '@asw-project/shared/types/services';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slide,
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import AccessibilityIcon from '@material-ui/icons/Accessible';
import CloseIcon from '@material-ui/icons/ExpandMore';
import { DatePicker } from '@material-ui/pickers';
import { Dayjs } from 'dayjs';
import { FC, forwardRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { serviceToIcon } from './serviceToIcon';

export interface LibraryFiltersForm {
  readonly accessible: boolean;
  readonly date: Dayjs | null;
  readonly selectedServices: Service[];
}

interface LibraryFiltersProps {
  readonly formControl: Control<LibraryFiltersForm>;
  readonly open: boolean;
  onReset(): void;
  setClose(): void;
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: { margin: 2 },
  box: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 0),
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    '& > *:last-child': {
      marginBottom: 0,
    },
  },
  container: {},
}));

export const LibraryFilters: FC<LibraryFiltersProps> = ({
  formControl,
  open,
  onReset,
  setClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={setClose}
      TransitionComponent={Transition}
      PaperProps={{
        className: classes.dialogPaper,
      }}
    >
      <Box id="top">
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={setClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Filters
            </Typography>
            <Button autoFocus color="inherit" onClick={setClose}>
              apply
            </Button>
          </Toolbar>
        </AppBar>
        <Container className={classes.container}>
          <Box className={classes.box}>
            <Controller
              control={formControl}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  fullWidth
                  clearable
                  label="Open on date"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={formControl}
              name="selectedServices"
              render={({ field: { onChange, value } }) => (
                <FormControl variant="outlined">
                  <InputLabel id="available-services-label">
                    Available Services
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Available Services"
                    labelId="available-services-label"
                    id="available-services"
                    multiple
                    value={value}
                    onChange={(e) => onChange(e.target.value as any)}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {(selected as string[]).map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                            color="primary"
                            size="small"
                            icon={serviceToIcon(value as Service)}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {services.map((x) => (
                      <MenuItem key={x} value={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml={1}
            >
              <Typography>
                <AccessibilityIcon
                  fontSize="small"
                  htmlColor="rgba(0,0,0,0.87)"
                  style={{ marginBottom: '-4px' }}
                />
                Accessible
              </Typography>
              <Controller
                control={formControl}
                name="accessible"
                render={({ field: { value, onChange } }) => (
                  <Switch
                    checked={value}
                    onChange={(_, updated) => onChange(updated)}
                  />
                )}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        <Button fullWidth color="inherit" variant="outlined" onClick={onReset}>
          Clear
        </Button>
      </Container>
    </Dialog>
  );
};
