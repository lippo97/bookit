import {
  IconButton,
  InputBase,
  InputBaseProps,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import property from 'lodash/property';
import React from 'react';
import { useForm } from 'react-hook-form';
import { compose } from '@asw-project/shared/util/functions';
import FilterListIcon from '@material-ui/icons/FilterList';

// type SearchbarProps = {
//   onSearch(query: string): void;
//   onFilter(): void;
// } & Pick<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   'defaultValue' | 'placeholder'
// >;

type SearchbarProps = InputBaseProps & {
  handleOpenFilter(): void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    height: '56px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    width: '48px',
  },
}));

function Searchbar({ handleOpenFilter, ...rest }: SearchbarProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
      <InputBase
        autoFocus
        id="query"
        {...rest}
        className={classes.input}
        inputProps={{
          style: { padding: 0 },
        }}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        onClick={handleOpenFilter}
      >
        <FilterListIcon />
      </IconButton>
    </Paper>
  );
}

// function Searchbar({
//   onSearch,
//   onFilter,
//   defaultValue,
//   placeholder,
// }: SearchbarProps) {
//   const classes = useStyles();
//   const { register, handleSubmit } = useForm();

//   return (
//     <Paper
//       component="form"
//       className={classes.root}
//       onSubmit={handleSubmit(compose(property('query'), onSearch))}
//     >
//       <IconButton type="submit" className={classes.iconButton}>
//         <SearchIcon />
//       </IconButton>
//       <InputBase
//         autoFocus
//         id="query"
//         placeholder={placeholder}
//         defaultValue={defaultValue}
//         {...register('query')}
//         className={classes.input}
//         inputProps={{
//           style: { padding: 0 },
//         }}
//       />
//       <IconButton
//         type="button"
//         className={classes.iconButton}
//         onClick={onFilter}
//       >
//         <FilterListIcon />
//       </IconButton>
//     </Paper>
//   );
// }

export default Searchbar;
