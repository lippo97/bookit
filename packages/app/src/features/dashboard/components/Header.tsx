import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

interface HeaderProps {
  title: string;
}

const SpacedHeader = styled('header')(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export const Header = ({ title }: HeaderProps) => (
  <SpacedHeader>
    <Typography variant="h2">{title}</Typography>
  </SpacedHeader>
);
