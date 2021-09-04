import { makeStyles } from '@material-ui/core/styles';
import useRect from 'app/src/hooks/useRect';
import React, { useRef, useEffect, useState } from 'react';

import * as Vector2 from '@asw-project/shared/util/vector';
import FillHeight from '../FillHeight';
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
    <FillHeight>
      <div className={classes.root}>
        <Toolbar />
        <Board onClick={handleClick} />
      </div>
    </FillHeight>
  );
}

export default Editor;
