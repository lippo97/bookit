import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  styled,
  Toolbar as MuiToolbar,
  Typography,
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from 'react-router-dom';

export interface ProminentAppBarProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly image?: string;
  readonly onBack?: () => void;
}

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({}));

const Toolbar = styled(MuiToolbar)<{ prominent?: boolean }>(({}) => ({
  minHeight: '128px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const TitleBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ProminentAppBar: React.FC<ProminentAppBarProps> = ({
  subtitle,
  title,
  onBack,
}) => {
  const navigate = useNavigate();
  const onBackFallback = () => navigate(-1);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onBack || onBackFallback}
        >
          <BackIcon />
        </IconButton>
        <TitleBox>
          <Typography variant="h6" style={{ fontSize: '1.1rem' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle1"
              style={{ marginTop: -7, fontSize: '.85rem' }}
            >
              {subtitle}
            </Typography>
          )}
        </TitleBox>
        <Box width={36} />
      </Toolbar>
    </StyledAppBar>
  );
};
