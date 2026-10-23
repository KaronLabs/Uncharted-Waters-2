import getSailor from '../src/data/sailorData';
import getShipSpeed from '../src/game/world/shipSpeed';
import type { State } from '../src/state/state';
import type { PlannedDirection } from './worldRoutePlanner';

type Position = { x: number; y: number };

const signedWrappedXDelta = (target: number, current: number) => {
  const direct = target - current;
  if (direct > 1080) return direct - 2160;
  if (direct < -1080) return direct + 2160;
  return direct;
};

export const classifyDockingCorrectionMovement = ({
  before,
  after,
  axis,
  key,
}: {
  before: Position;
  after: Position;
  axis: 'x' | 'y';
  key: PlannedDirection;
}) => {
  const xMovement = signedWrappedXDelta(after.x, before.x);
  const yMovement = after.y - before.y;
  const requestedAxisMovement = axis === 'x' ? xMovement : yMovement;
  const requestedAxisProgress =
    key === 'd' || key === 's' ? requestedAxisMovement : -requestedAxisMovement;
  const totalMovement = Math.abs(xMovement) + Math.abs(yMovement);
  const outcome =
    totalMovement < 0.01
      ? ('stalled' as const)
      : requestedAxisProgress >= 0.01
      ? ('targetward-movement' as const)
      : ('unexpected-movement' as const);
  return {
    outcome,
    requestedAxisMovement,
    requestedAxisProgress,
    totalMovement,
  };
};

// Derive each candidate's speed from the observed save, without reading or
// mutating the live game state. Wind can change after the next tick, so this
// remains a route proposal and every pulse must be followed by a fresh save.
export const getSavedHeadingMovement = (
  saved: Pick<State, 'fleets' | 'mates' | 'wind'>,
): Record<PlannedDirection, number> => {
  const captain = saved.mates.find(({ role }) => role === 0);
  if (!captain)
    throw new Error('Cannot plan docking without a flagship captain');
  const ship = saved.fleets['1'].ships[0];
  const sailor = getSailor(captain.sailorId);
  return {
    w: getShipSpeed(ship, sailor, 0, saved.wind) / 40,
    d: getShipSpeed(ship, sailor, 2, saved.wind) / 40,
    s: getShipSpeed(ship, sailor, 4, saved.wind) / 40,
    a: getShipSpeed(ship, sailor, 6, saved.wind) / 40,
  };
};
