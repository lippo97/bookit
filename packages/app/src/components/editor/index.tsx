import { makeStyles } from '@material-ui/core/styles';
import useRect from 'app/src/hooks/useRect';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FullVertical from '../FullVertical';
import * as Vector2 from '@asw-project/shared/util/vector';
import Board from './Board';
import Toolbar from './Toolbar';

interface EditorProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    height: '100%',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
    "toolbar toolbar"
    "main    main"
    `,
  },
}));

type Tool = 'add' | 'remove';

function Editor({}: EditorProps) {
  const classes = useStyles();
  const tool = useState<Tool | null>(null);

  const handleClick = (x: number, y: number) => console.log(x, y);

  return (
    <FullVertical>
      <div className={classes.root}>
        <Toolbar />
        <Board onClick={handleClick} />
      </div>
    </FullVertical>
  );
}

export default Editor;
