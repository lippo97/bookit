import { Button, makeStyles } from '@material-ui/core';

const useClasses = makeStyles((theme) => ({
  button: {
    color: 'inherit',
  },
}));

function ToolbarContent() {
  const classes = useClasses();
  return (
    <>
      <Button className={classes.button}>Example 1</Button>
      <Button className={classes.button}>Example 2</Button>
    </>
  );
}

export default ToolbarContent;
