import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SeatIcon from '@material-ui/icons/EventSeat';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectAllIcon from '@material-ui/icons/SelectAll';
// import ClearAllIcon from '@material-ui/icons/ClearAll';
import PanToolIcon from '@material-ui/icons/PanTool';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useState } from 'react';
import { useSeats } from '../../stores/seats';
import { ButtonSection } from './ButtonSection';
import { useEditor } from '../../stores/editor';
import ClearAllIcon from '@/assets/clear_selection.svg';

interface ToolbarProps {}

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
}));

export const Toolbar = ({}: ToolbarProps) => {
  const classes = useStyles();
  const clearSelection = useSeats((s) => s.clearSelection);
  const selectAll = useSeats((s) => s.selectAll);
  const [sizeX, sizeY] = useSeats((s) => s.size);

  const selectedTool = useEditor(s => s.selectedTool)
  const setSelectedTool = useEditor(s => s.setSelectedTool)
  // const [selectedTool, setSelectedTool] = useState(0);

  return (
    <Paper elevation={1} square className={classes.toolbar}>
      <Box display="flex" justifyContent="space-between" alignItems="end">
        <Box display="flex" alignItems="end">
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
            <Button variant="outlined" className={classes.button}>
              {sizeX} ⨉ {sizeY}
            </Button>
          </ButtonSection>
        </Box>
        <Box>
          <Button variant="outlined" color="default" className={classes.button}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary" className={classes.button}>
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
