import { readRenderedWind, saveFromSystem } from '../firstVoyageUtils';
import { getSavedHeadingMovement } from '../worldNavigationControl';
import { setState } from '../utils';

describe('serialized sea save and rendered docking wind', () => {
  it('reads the visible wind for a save that has no wind field', () => {
    // DIAGNOSTIC_ONLY: this seeded sea state is not an approval journey.
    setState({
      portId: null,
      buildingId: null,
      timePassed: 240,
      dayAtSea: 3,
      fleets: {
        '1': {
          position: { x: 300, y: 300 },
          ships: [
            { id: '6', name: 'Flagship', crew: 20, cargo: [], durability: 25 },
          ],
        },
      },
      mates: [{ sailorId: '1', role: 0 }],
    });
    cy.visit('');
    cy.contains('Game is loading...').should('not.exist');
    cy.get('[data-test=right] img.w-20.h-20')
      .first()
      .should('have.attr', 'src')
      .and('not.be.empty');

    saveFromSystem().then((saved) => {
      expect(saved).not.to.have.property('wind');
      return readRenderedWind().then((wind) => {
        expect(wind.direction).to.be.within(0, 7);
        expect(wind.speed).to.be.within(1, 7);
        const movement = getSavedHeadingMovement({ ...saved, wind });
        expect(Object.values(movement).every(Number.isFinite)).to.equal(true);
        expect(
          Object.values(movement).some((distance) => distance > 0),
        ).to.equal(true);
      });
    });
  });
});
