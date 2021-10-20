import { Box, Button, ButtonGroup, Paper, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useSeats } from '../../stores/seats';

interface ToolbarProps {}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    gridArea: 'toolbar',
    height: '60px',
    background: theme.palette.background.paper,
    padding: theme.spacing(1.5),
    zIndex: 1,
  },
}));

export const Toolbar = ({}: ToolbarProps) => {
  const classes = useStyles();
  const clearSelection = useSeats((s) => s.clearSelection);
  return (
    <Paper elevation={1} square className={classes.toolbar}>
      <Box display="flex" justifyContent="space-between">
        <ButtonGroup
          variant="outlined"
          color="default"
          aria-label="editing tools"
        >
          <Button>
            <AddIcon />
          </Button>
          <Button onClick={clearSelection}>Clear selection</Button>
          <Button>
            <RemoveIcon />
          </Button>
          <Button>Three</Button>
        </ButtonGroup>
        <Box>
          <Button variant="outlined" color="default">
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: '8px' }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
