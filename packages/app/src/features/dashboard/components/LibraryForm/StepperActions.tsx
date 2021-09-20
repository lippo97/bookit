import { styled, Box, Button as MuiButton } from '@material-ui/core';

interface StepperActionsProps {
  readonly onBack: () => void;
  readonly onNext: () => void;
  readonly disabledBack?: boolean;
  readonly disabledNext?: boolean;
  readonly nextButtonText?: string;
}

const Button = styled(MuiButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export const StepperActions = ({
  onBack,
  onNext,
  disabledBack,
  disabledNext,
  nextButtonText,
}: StepperActionsProps) => (
  <Box display="flex" justifyContent="right">
    <Button
      size="medium"
      variant="text"
      color="primary"
      onClick={onBack}
      disabled={disabledBack ?? false}
    >
      Back
    </Button>
    <Button
      size="medium"
      variant="outlined"
      color="primary"
      disabled={disabledNext ?? false}
      onClick={onNext}
    >
      {nextButtonText ?? 'Next'}
    </Button>
  </Box>
);
