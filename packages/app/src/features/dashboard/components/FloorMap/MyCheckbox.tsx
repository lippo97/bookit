import { Checkbox, CheckboxProps } from '@material-ui/core';
import { AggregateRowResult } from './utils';

type MyCheckboxProps = Omit<CheckboxProps, 'checked' | 'indeterminate'> & {
  checked: AggregateRowResult;
};

export const MyCheckbox = ({ checked, ...rest }: MyCheckboxProps) => {
  const indeterminate = checked === 'indeterminate';
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _checked = checked === true;
  return (
    <Checkbox indeterminate={indeterminate} checked={_checked} {...rest} />
  );
};
