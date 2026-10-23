import { readFileSync } from 'fs';
import path from 'path';
import { terms } from './terms';
import descriptions from './terms/descriptions';
import { koreanTerms } from './koreanTerms';
import { regularPorts, supplyPorts } from '../data/portData';
import { goodData } from '../data/goodsData';
import { shipData } from '../data/shipData';
import { itemData } from '../data/itemData';
import { sailorData } from '../data/sailorData';
import { landmarks } from '../data/discoveryData';

const tokens = (text: string): string[] =>
  (text.match(/\{[^{}]+\}|%\d*\$?[sdif]/g) || []).sort();

const originalData = (file: string): unknown =>
  JSON.parse(
    readFileSync(
      path.resolve(__dirname, '../../../work/db-korean', file),
      'utf8',
    ),
  );

describe('Korean shared terminology', () => {
  test('covers every existing shared term and description without English fallback', () => {
    Object.keys(terms).forEach((source) => {
      expect(koreanTerms[source]).toEqual(expect.any(String));
      expect(koreanTerms[source]).not.toBe(source);
      expect(koreanTerms[source]).toMatch(/[가-힣]/);
      expect(tokens(koreanTerms[source])).toEqual(tokens(source));
    });
  });

  test('covers names exposed by live data, including names absent from the old catalog', () => {
    const names = [
      ...Object.values(regularPorts),
      ...Object.values(supplyPorts),
      ...Object.values(goodData),
      ...Object.values(shipData),
      ...Object.values(itemData),
      ...Object.values(sailorData),
      ...landmarks,
    ].map((entry) => entry.name);
    names.forEach((name) => expect(koreanTerms[name]).toMatch(/[가-힣]/));
  });

  test('uses original Korean names for critical characters and semantic port identities', () => {
    expect(koreanTerms['João Franco']).toBe('조안 페레로');
    expect(koreanTerms['Katarina Erantzo']).toBe('카탈리나 에란초');
    expect(koreanTerms['Otto Baynes']).toBe('옷토 스피노라');
    expect(koreanTerms['Rocco Alemkel']).toBe('로코 알렘켈');
    expect(koreanTerms['Duke Franco']).toBe('페레로 공작');
    expect(koreanTerms.Calicut).toBe('캘커타');
    expect(koreanTerms.Massawa).toBe('맛사와');
    expect(koreanTerms.Axum).toBe('아크슴');
    expect(koreanTerms['Staff of the Saint']).toBe('성자의 지팡이');
  });

  test('matches all original port names by unique geographic identity, not array position', () => {
    const originalPorts = originalData('ports/ports.json') as {
      name: string;
      position: { x: number; y: number };
    }[];
    const ports = [...regularPorts, ...supplyPorts];
    expect(ports).toHaveLength(130);
    ports.forEach((port) => {
      const matches = originalPorts.filter(
        (original) =>
          original.position.x === port.position.x &&
          original.position.y === port.position.y,
      );
      expect(matches).toHaveLength(1);
      expect(koreanTerms[port.name]).toBe(matches[0].name);
    });
  });

  test('matches original ship identities using names and complete unchanged ship specifications', () => {
    const originalShips = Object.values(
      originalData('ships/ships.json') as Record<
        string,
        Record<string, unknown>
      >,
    );
    Object.values(shipData).forEach((ship) => {
      const original = originalShips.find(
        (candidate) => candidate.name === koreanTerms[ship.name],
      );
      expect(original).toBeDefined();
      const { name, description, sailType, ...specifications } = ship;
      expect(original).toMatchObject(specifications);
    });
  });

  test('matches original item identities using Korean names, images, prices and ratings', () => {
    const originalItems = Object.values(
      originalData('portraits-items-discoveries/items.json') as Record<
        string,
        Record<string, unknown>
      >,
    );
    Object.values(itemData).forEach((item) => {
      // The story-only Staff has no remake sprite; its original identity is
      // the zero-price royal staff described in the Axum story.
      const sprite =
        item.name === 'Staff of the Saint'
          ? { imageSlice: 39 }
          : { imageSlice: item.imageSlice };
      expect(originalItems).toContainEqual(
        expect.objectContaining({
          name: koreanTerms[item.name],
          ...sprite,
          price: item.price,
          rating: item.rating,
        }),
      );
    });
  });

  test('preserves numeric quantities and placeholders in current descriptions', () => {
    Object.keys(descriptions).forEach((source) => {
      expect(tokens(koreanTerms[source])).toEqual(tokens(source));
      expect(koreanTerms[source].match(/\d+/g) || []).toEqual(
        source.match(/\d+/g) || [],
      );
    });
  });

  test('does not introduce player ship names or mutate source data', () => {
    expect(koreanTerms['Sea Dragon']).toBeUndefined();
    expect(sailorData['1'].name).toBe('João Franco');
    expect(terms['João Franco']).not.toBe('조안 페레로');
  });
});
