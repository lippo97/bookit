import { Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { CenterContent } from './CenterContent';

interface RetryProps {
  onRetry?(): void;
}

const MyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const Retry = ({ onRetry }: RetryProps) => (
  <CenterContent>
    <Typography variant="h6" align="center">
      Couldn&apos;t find the content you are looking for.
    </Typography>
    {onRetry && (
      <MyButton variant="outlined" onClick={onRetry}>
        Retry
      </MyButton>
    )}
  </CenterContent>
);
