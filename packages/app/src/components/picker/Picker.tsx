import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Room } from './types';
import * as V2 from '@asw-project/shared/util/vector';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import Grid from './Grid';
import Seat from './Seat';

const SQUARE_SIZE = 80;

interface BaseProps {
    readonly selected: number | null;
    readonly room?: Room;
    readonly boardRef?: React.LegacyRef<QuickPinchZoom>
    select(id: number): void
}

type PickerProps = BaseProps & React.ComponentPropsWithoutRef<"div">;

const useStyles = makeStyles((theme) => ({
    main: {
        // gridArea: 'main',
        // background: '#f1f1f1',
        // overflow: 'scroll',
    },
}));

function Picker({ room, selected, select, ...props }: PickerProps) {
    const classes = useStyles();
    const [transform, setTransform] = useState<string>('');

    const { style, boardRef, ...otherProps } = props;

// This is ugly as hell, but we need the selected seat to be rendered
// last
    function renderSeats(room: Room) {
        let seats: JSX.Element[] = [];
        let selectedOne: JSX.Element = <></>;

        room.seats.forEach(({ id, position }) => {
            seats.push(
                <Seat
                    key={id}
                    position={V2.mul(position, SQUARE_SIZE)}
                    id={id}
                    selected={false}
                    onClick={() => select(id)}
                    squareSize={SQUARE_SIZE}
                />
            )
            if (id == selected) {
                selectedOne = (
                    <Seat
                        position={V2.mul(position, SQUARE_SIZE)}
                        id={id}
                        selected={true}
                        onClick={() => select(id)}
                        squareSize={SQUARE_SIZE}
                    />
                )
            }
        })

        seats.push(selectedOne);
        return seats;
    }

    function renderContent() {
        if (room !== undefined) {
            const [viewBoxX, viewBoxY] = V2.mul(room.size, SQUARE_SIZE);
            return (
                <QuickPinchZoom
                    ref={boardRef}
                    inertiaFriction={0.8}
                    horizontalPadding={SQUARE_SIZE / 2}
                    verticalPadding={SQUARE_SIZE / 2}
                    onUpdate={(upd) => setTransform(make3dTransformValue(upd))}
                >
                    <svg
                        // viewBox={`0 0 1600 800`}
                        viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}
                        style={{
                            transform,
                            transformOrigin: '0 0',
                            height: '60vh'
                        }}
                    >
                        <Grid size={SQUARE_SIZE} />
                        {renderSeats(room)}
                    </svg>
                </QuickPinchZoom>
            );
        }
        return (
            <div style={{
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div
            {...props}
            style={{
                // overflow: 'hidden',
                boxSizing: 'border-box',
                border: '3px solid black',
                ...style
            }}
        >
            {renderContent()}
        </div>
    )
}

export default Picker;
