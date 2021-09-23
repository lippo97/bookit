import { TextField } from '@material-ui/core';

export const ManagerForm = () => (
  <form>
    <TextField label="First Name" name="firstName" id="firstName" />
    <TextField label="Second Name" name="secondName" id="secondName" />
  </form>
);
