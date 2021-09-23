import { Box, Button, ButtonProps, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';

type LoadingButtonProps = ButtonProps & {
  isLoading: boolean;
};

const ButtonCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
}));

function LoadingButton({ isLoading, ...props }: LoadingButtonProps) {
  return (
    <Box margin={1} position="relative">
      <Button disabled={isLoading} {...props} />
      {isLoading && <ButtonCircularProgress size={24} />}
    </Box>
  );
}

export default LoadingButton;
