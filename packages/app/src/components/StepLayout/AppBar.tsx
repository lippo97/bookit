import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  styled,
  Theme,
  Toolbar as MuiToolbar,
  Typography,
} from '@material-ui/core';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from 'react-router-dom';

export interface AppBarProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly transparent?: boolean;
  readonly onBack?: () => void;
}

const StyledAppBar = styled(MuiAppBar)<Theme, { transparent?: boolean }>(
  ({ transparent }) => {
    const base: CreateCSSProperties<{ transparent?: boolean }> = {
      position: transparent ? 'absolute' : 'static',
    };
    return {
      ...base,
      ...(transparent
        ? {
            boxShadow: 'none',
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0))',
          }
        : {}),
    };
  },
);

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
}));

const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingLeft: theme.spacing(2),
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const AppBar: React.FC<AppBarProps> = ({
  title,
  onBack,
  transparent,
}) => {
  const navigate = useNavigate();
  const onBackFallback = () => navigate(-1);

  return (
    <StyledAppBar position="static" transparent={transparent}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onBack || onBackFallback}
          style={{ padding: '16px' }}
        >
          <BackIcon style={{ marginTop: -2 }} />
        </IconButton>
        <TitleBox>
          <Typography variant="h6">{title}</Typography>
          {/* <Typography variant="h6" style={{ fontSize: '1.1rem' }}>
            {title}
          </Typography> */}
          {/* {subtitle && (
            <Typography
              variant="subtitle1"
              style={{ marginTop: -7, fontSize: '.85rem' }}
            >
              {subtitle}
            </Typography>
          )} */}
        </TitleBox>
        <Box width={36} />
      </Toolbar>
    </StyledAppBar>
  );
};
