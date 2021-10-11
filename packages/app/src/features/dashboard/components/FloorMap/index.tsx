import { Layout } from '@/components/Layout';
import { Box, Button, ButtonGroup, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface FloorMapProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
    "toolbar  sidebar"
    "content  sidebar"
    `,
  },
  toolbar: {
    gridArea: 'toolbar',
    height: '60px',
    background: theme.palette.background.paper,
    padding: theme.spacing(1.5),
  },
  sidebar: {
    gridArea: 'sidebar',
    width: '256px',
    height: '100%',
    padding: theme.spacing(1.5),
    zIndex: theme.zIndex.drawer,
  },
  content: {
    gridArea: 'content',
    background: theme.palette.background.default,
  },
}));

export const FloorMap = ({}: FloorMapProps) => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Paper elevation={2} square className={classes.toolbar}>
          <Box display="flex" justifyContent="space-between">
            <ButtonGroup
              variant="outlined"
              color="default"
              aria-label="editing tools"
            >
              <Button>
                <AddIcon />
              </Button>
              <Button>Two</Button>
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
        <Paper square elevation={3} className={classes.sidebar}>
          <Typography variant="h6">Details</Typography>
          <Typography variant="subtitle1">Selected seats:</Typography>
        </Paper>
        <div className={classes.content}>
          <p>content</p>
          <p>contentone</p>
        </div>
      </div>
    </Layout>
  );
};
