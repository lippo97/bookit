import { useMobile } from '@/hooks/useMobile';
import { SvgIconTypeMap, withStyles } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import SeatIcon from '@material-ui/icons/EventSeat';
import SaveIcon from '@material-ui/icons/Save';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ClearAllIcon from '@/assets/clear_selection.svg';
import PanToolIcon from '@material-ui/icons/PanTool';
import MuiSpeedDial from '@material-ui/lab/SpeedDial';
import MuiSpeedDialAction, {
  SpeedDialActionProps as MuiSpeedDialActionProps,
} from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { compose } from '@asw-project/shared/util/functions';

interface ToolFABProps {
  readonly open: boolean;
  onOpen(): void;
  onClose(): void;
  onSave(): void;
}

type Icon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;

const tools = [
  {
    name: 'select',
    label: 'Select',
    Icon: PanToolIcon,
  },
  {
    name: 'add',
    label: 'Add',
    Icon: SeatIcon,
  },
  {
    name: 'remove',
    label: 'Remove',
    Icon: DeleteIcon,
  },
] as const;

const actions = ({
  onSave,
  clearSelection,
  selectAll,
}: {
  onSave: () => void;
  clearSelection: () => void;
  selectAll: () => void;
}) =>
  [
    {
      name: 'save',
      label: 'Save',
      Icon: SaveIcon,
      handle: onSave,
    },
    {
      name: 'clearAll',
      label: 'Clear selection',
      Icon: ClearAllIcon,
      handle: clearSelection,
    },
    {
      name: 'selectAll',
      label: 'Select all',
      Icon: SelectAllIcon,
      handle: selectAll,
    },
  ] as const;

const SpeedDial = withStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1300,
  },
}))(MuiSpeedDial);

const MySpeedDialAction = ({
  selected,
  tooltipTitle,
  icon: Icon,
  ...rest
}: Omit<MuiSpeedDialActionProps, 'icon'> & {
  selected: boolean;
  icon: Icon;
}) => {
  const props = {
    tooltipTitle: selected ? (
      <span style={{ fontWeight: 'bold' }}>{tooltipTitle}</span>
    ) : (
      tooltipTitle
    ),
    icon: selected ? <Icon color="secondary" /> : <Icon />,
  };
  return <MuiSpeedDialAction {...rest} {...props} />;
};

export const ToolFAB = ({ open, onOpen, onClose, onSave }: ToolFABProps) => {
  const selectedTool = useEditor((s) => s.selectedTool);
  const setSelectedTool = useEditor((s) => s.setSelectedTool);
  const clearSelection = useSeats((s) => s.clearSelection);
  const selectAll = useSeats((s) => s.selectAll);
  const isMobile = useMobile();

  return (
    <SpeedDial
      ariaLabel="Select tool"
      icon={<SpeedDialIcon />}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    >
      {tools.map(({ name, Icon, label }) => (
        <MySpeedDialAction
          key={name}
          icon={Icon}
          tooltipTitle={label}
          tooltipOpen={isMobile}
          onClick={() => setSelectedTool(name)}
          selected={selectedTool === name}
        />
      ))}
      {actions({ onSave, selectAll, clearSelection }).map(
        ({ name, Icon, label, handle }) => (
          <MuiSpeedDialAction
            key={name}
            icon={<Icon />}
            tooltipTitle={label}
            tooltipOpen={isMobile}
            onClick={compose(handle, onClose)}
          />
        ),
      )}
    </SpeedDial>
  );
};
