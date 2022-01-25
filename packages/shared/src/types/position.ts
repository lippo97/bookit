import { Position } from "../generatedTypes";
import { Vector2 } from "../util/vector";

export const V2ToPosition = ([x, y]: Vector2): Position => ({ x, y });

export const positionToV2 = ({x, y}: Position): Vector2 => [x, y];
