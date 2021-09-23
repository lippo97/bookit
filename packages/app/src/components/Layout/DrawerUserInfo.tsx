import { useIsLoggedIn } from '@/stores/authentication';
import { Avatar, Box, Typography } from '@material-ui/core';
import { blue, green, orange, pink, red } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';

const Name = styled(Typography)(({ theme }) => ({
  fontSize: '1.1em',
  fontWeight: 600,
}));

const Email = styled(Typography)(({ theme }) => ({
  fontSize: '0.95em',
  color: theme.palette.text.secondary,
}));

const Layout = ({
  avatar,
  name,
  email,
}: {
  avatar: React.ReactNode;
  name: string;
  email?: string;
}) => (
  <Box p={2} pt={1}>
    <Box mb={2}>{avatar}</Box>
    <Name>{name}</Name>
    {email && <Email>{email}</Email>}
  </Box>
);
export const DrawerUserInfo = () => {
  const colors = [green[500], blue[500], pink[500], orange[500], red[500]];
  const email = 'mario@rossi.com';
  const isLoggedIn = useIsLoggedIn();

  const n = email.charCodeAt(0) % colors.length;

  if (!isLoggedIn) {
    return <Layout avatar={<Avatar>?</Avatar>} name="Not signed in" />;
  }

  return (
    <Layout
      avatar={<Avatar style={{ backgroundColor: colors[n] }}>MR</Avatar>}
      name="Mario Rossi"
      email={email}
    />
  );
};
