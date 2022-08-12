import { Box, Paper, SvgIconTypeMap, Typography } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { FC } from 'react';

interface FeatureCardProps {
  readonly IconComponent: OverridableComponent<SvgIconTypeMap>;
  readonly title: string;
  readonly description: string;
}
export const FeatureCard: FC<FeatureCardProps> = ({
  IconComponent,
  title,
  description,
}) => (
  <Paper elevation={1}>
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      minHeight={240}
    >
      <IconComponent style={{ fontSize: 120 }} />
      <Typography variant="subtitle1" align="center">
        {title}
      </Typography>
      <Typography variant="body2" align="center">
        {description}
      </Typography>
    </Box>
  </Paper>
);
