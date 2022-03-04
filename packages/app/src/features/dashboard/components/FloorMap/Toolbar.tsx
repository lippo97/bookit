import * as V2 from '@asw-project/shared/util/vector';
import ClearAllIcon from '@/assets/clear_selection.svg';
import { useMobile } from '@/hooks/useMobile';
import { useOpenClose } from '@/hooks/useOpenClose';
import { Box, Button, Hidden, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import SeatIcon from '@material-ui/icons/EventSeat';
import PanToolIcon from '@material-ui/icons/PanTool';
import SaveIcon from '@material-ui/icons/Save';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { ModalButton } from '../ModalButton';
import { ButtonSection } from './ButtonSection';

interface ToolbarProps {
  onSave(): void;
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    gridArea: 'toolbar',
    height: '90px',
    background: theme.palette.background.paper,
    padding: theme.spacing(1.5),
    zIndex: 1,
  },
  toggleButton: {
    height: '40px',
    width: '40px',
  },
  section: {
    marginRight: theme.spacing(2),
  },
  actionButton: {
    marginLeft: theme.spacing(1),
    height: '40px',
    minWidth: '40px',
    width: '40px',
    padding: '6px',
    '&:first-child': {
      marginLeft: 0,
    },
  },
  button: {
    height: '40px',
    marginLeft: theme.spacing(1),
    '&:first-child': {
      marginLeft: 0,
    },
  },
  zoomSection: {
    width: '240px',
    justifyContent: 'space-between',
  },
}));

export const Toolbar = ({ onSave }: ToolbarProps) => {
  const navigate = useNavigate();
  const clearSelection = useSeats((s) => s.clearSelection);
  const nextSeatId = useSeats((s) => s._nextSeatId);
  const selectAll = useSeats((s) => s.selectAll);
  const [sizeX, sizeY] = useSeats((s) => s.size);
  const setSize = useSeats((s) => s.setSize);
  const classes = useStyles();

  const selectedTool = useEditor((s) => s.selectedTool);
  const setSelectedTool = useEditor((s) => s.setSelectedTool);

  const [labelOpen, onLabelOpen, onLabelClose] = useOpenClose();
  const [test, setTest] = useState('hello');

  return (
    <Hidden smDown>
      <Paper elevation={1} square className={classes.toolbar}>
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <Box display="flex">
            <ButtonSection name="File">
              <Button
                variant="outlined"
                className={classes.actionButton}
                onClick={() => navigate(-1)}
              >
                <BackIcon />
              </Button>
              <Button
                variant="outlined"
                className={classes.actionButton}
                onClick={onSave}
              >
                <SaveIcon />
              </Button>
            </ButtonSection>
            <ButtonSection name="Tool">
              <ToggleButtonGroup
                value={selectedTool}
                exclusive
                onChange={(_, updated) => {
                  if (updated === null) return;
                  if (updated !== 'selected') {
                    clearSelection();
                  }
                  setSelectedTool(updated);
                }}
                aria-label="current tool"
              >
                <ToggleButton value="select" className={classes.toggleButton}>
                  <PanToolIcon />
                </ToggleButton>
                <ToggleButton value="add" className={classes.toggleButton}>
                  <SeatIcon />
                </ToggleButton>
                <ToggleButton value="remove" className={classes.toggleButton}>
                  <DeleteIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonSection>
            <ButtonSection name="Selection">
              <Button
                variant="outlined"
                onClick={selectAll}
                className={classes.actionButton}
              >
                <SelectAllIcon />
              </Button>
              <Button
                variant="outlined"
                onClick={clearSelection}
                className={classes.actionButton}
              >
                <ClearAllIcon />
              </Button>
            </ButtonSection>
            <ButtonSection name="Size">
              <Button
                variant="outlined"
                className={classes.button}
                style={{ fontSize: '18px' }}
              >
                {sizeX} × {sizeY}
              </Button>
            </ButtonSection>
            <ButtonSection name="Label">
              <Button
                variant="outlined"
                className={classes.actionButton}
                onClick={onLabelOpen}
              >
                {nextSeatId}
              </Button>
              <ModalButton
                onChange={(size: V2.Vector2) => setSize(size)}
                modalContent={
                  <>
                    <div>Change size:</div>
                  </>
                }
              >
                {sizeX} × {sizeY}
              </ModalButton>
            </ButtonSection>
          </Box>
        </Box>
      </Paper>
    </Hidden>
  );
};
