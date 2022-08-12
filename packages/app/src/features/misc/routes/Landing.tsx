import { Layout } from '@/components/Layout';
import Searchbar from '@/components/Searchbar';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CropFreeIcon from '@material-ui/icons/CropFree';
import GridOnIcon from '@material-ui/icons/GridOn';
import WifiIcon from '@material-ui/icons/Wifi';
import background from '@/assets/library.jpg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormEvent, FormEventHandler } from 'react';
import { FeatureCard } from '../components/FeatureCard';

const useStyles = makeStyles((theme) => ({
  background: {
    height: 250,
    backgroundColor: '#dadada',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: 360,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      backgroundColor: 'rgba(0,0,0,0.45)',
      //   backgroundColor: 'rgba(152, 66, 211, 0.63)',
    },
  },
  subtitle: {
    fontSize: 44,
    color: 'white',
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 500,
    marginBottom: theme.spacing(4),
  },
}));

interface FormValues {
  readonly query: string;
}

export const Landing = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>({});

  const onSubmit = handleSubmit(({ query }) =>
    navigate(`/libraries?search=${query}`),
  );

  const { ref, ...registeredQuery } = register('query');

  return (
    <Layout transparentAppBar>
      <Box
        className={classes.background}
        display="flex"
        flexDirection="column"
        justifyContent="end"
      >
        <Container style={{ zIndex: 30 }}>
          <Box my={4} component="form" onSubmit={onSubmit}>
            <Typography
              className={classes.subtitle}
              variant="h1"
              align="center"
            >
              Look for a library
            </Typography>
            <Searchbar
              placeholder="Milan, Central Library"
              {...registeredQuery}
            />
          </Box>
        </Container>
      </Box>
      <Box my={4}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard
                IconComponent={CropFreeIcon}
                title="Get access using a QR code"
                description="You will just have to provide the QR code to be given access to the library."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                IconComponent={GridOnIcon}
                title="Choose your place"
                description="You will be able to choose the place you like the most, using the integrated floor plan."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                IconComponent={WifiIcon}
                title="Check the services"
                description="Check out for the services available in every room."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};
