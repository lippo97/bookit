import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import _ from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { compose, composeC } from '@asw-project/shared/util/functions';

type SearchbarProps = {
  onSearch(query: string): void;
} & Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'placeholder'
>;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    height: '40px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    width: '36px',
  },
}));

function Searchbar({ onSearch, defaultValue, placeholder }: SearchbarProps) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={handleSubmit(compose(_.property('query'), onSearch))}
    >
      <InputBase
        autoFocus
        id="query"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register('query')}
        className={classes.input}
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Searchbar;
