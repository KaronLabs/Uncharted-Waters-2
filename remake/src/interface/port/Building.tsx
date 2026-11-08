import React, { useState } from 'react';

import Shipyard from './shipyard/Shipyard';
import BuildingMenu from '../common/BuildingMenu';
import Harbor from './harbor/Harbor';
import BuildingWrapper from './BuildingWrapper';
import { buildings } from '../../data/buildingData';
import useBuilding from './hooks/useBuilding';
import Lodge from './Lodge';
import Bank from './bank/Bank';
import Church from './Church';
import ItemShop from './ItemShop';
import Pub from './Pub';
import Market from './Market';
import Guild from './Guild';
import Palace from './Palace';
import {
  canExcavateTreasure,
  excavateTreasure,
  reportChartedMap,
  reportCollectorDiscoveries,
  resolveCollectorBetrayalPenalty,
  resolveMercatorBetrayalPenalty,
  signCartographerContract,
  signCollectorContract,
} from '../../state/actionsOriginalCore';
import { reportDiscoveries } from '../../state/actionsDiscovery';
import globalState from '../../state/state';
import { t } from '../../localization';

interface Props {
  buildingId: string;
}

export default function Building({ buildingId }: Props) {
  const { options } = buildings[buildingId];

  if (buildingId === '1') {
    return <Market />;
  }

  if (buildingId === '2') {
    return <Pub />;
  }

  if (buildingId === '3') {
    return <Shipyard />;
  }

  if (buildingId === '4') {
    return <Harbor />;
  }

  if (buildingId === '5') {
    return <Lodge />;
  }

  if (buildingId === '6') {
    return <Palace />;
  }

  if (buildingId === '7') {
    return <Guild />;
  }

  if (buildingId === '9') {
    return <Bank />;
  }

  if (buildingId === '10') {
    return <ItemShop />;
  }

  if (buildingId === '11') {
    return <Church />;
  }

  const { back, selectOption, reset, state: buildingState } = useBuilding();
  const [specialMessage, setSpecialMessage] = useState<string | null>(null);

  if (buildingId === '8') {
    const { portId } = globalState;
    const cartographerByPort: Record<string, 'mercator' | 'other'> = {
      '34': 'mercator',
      '1': 'other',
      '14': 'other',
    };
    const collectorByPort: Record<string, 'duchess_franco' | 'other'> = {
      '1': 'duchess_franco',
      '9': 'other',
      '28': 'other',
      '30': 'other',
    };
    const cartographer = portId ? cartographerByPort[portId] : undefined;
    const collector = portId ? collectorByPort[portId] : undefined;
    const excavatableId = ['p1-gold-medallion', 'p2-poseidons-staff'].find(
      (id) => canExcavateTreasure(id),
    );
    const specialOptions: { label: string; value: string }[] = [];
    if (cartographer) {
      specialOptions.push({ label: 'Report Map', value: 'Report Map' });
      specialOptions.push({
        label: 'Sign Cartographer Contract',
        value: 'Sign Cartographer Contract',
      });
    }
    if (collector) {
      specialOptions.push({
        label: 'Report Discoveries',
        value: 'Report Discoveries',
      });
      specialOptions.push({
        label: 'Sign Collector Contract',
        value: 'Sign Collector Contract',
      });
    }
    if (excavatableId) {
      specialOptions.push({
        label: 'Excavate Treasure',
        value: 'Excavate Treasure',
      });
    }

    const handleSpecialSelect = (value: string) => {
      if (value === 'Report Map') {
        const res = reportChartedMap();
        setSpecialMessage(
          res.newCells > 0
            ? t(
                'Charted sea sectors reported: {count} (Reward: {gold}g, Adventure Fame +{fame}).',
                {
                  count: res.newCells,
                  gold: res.gold,
                  fame: res.fame,
                },
              )
            : t('You have no newly charted sea sectors to report yet.'),
        );
      } else if (value === 'Sign Cartographer Contract' && cartographer) {
        if (
          cartographer === 'mercator' &&
          globalState.originalCore?.cartographerContract === 'other'
        ) {
          resolveMercatorBetrayalPenalty();
          setSpecialMessage(
            t(
              'Cartographer contract switched. Breaking Mercator’s exclusive commission halved all of your fame.',
            ),
          );
        } else {
          signCartographerContract(cartographer);
          setSpecialMessage(t('Cartographer contract signed.'));
        }
      } else if (value === 'Report Discoveries') {
        const res =
          globalState.originalCore?.collectorContract &&
          globalState.originalCore.collectorContract !== 'none'
            ? reportCollectorDiscoveries()
            : { ...reportDiscoveries(), fame: 0 };
        setSpecialMessage(
          res.ids.length > 0
            ? t(
                'Discoveries reported: {count} (Reward: {gold}g, Adventure Fame +{fame}).',
                {
                  count: res.ids.length,
                  gold: res.gold,
                  fame: res.fame,
                },
              )
            : t('You have no unreported discoveries to present.'),
        );
      } else if (value === 'Sign Collector Contract' && collector) {
        if (
          collector === 'duchess_franco' &&
          globalState.originalCore?.collectorContract === 'other'
        ) {
          resolveCollectorBetrayalPenalty();
          setSpecialMessage(
            t(
              'Collector contract switched. Breaking the Franco family’s exclusive patronage halved all of your fame.',
            ),
          );
        } else {
          signCollectorContract(collector);
          setSpecialMessage(t('Collector contract signed.'));
        }
      } else if (value === 'Excavate Treasure' && excavatableId) {
        const ok = excavateTreasure(excavatableId);
        setSpecialMessage(
          ok
            ? t(
                'Following the treasure map, your expedition excavated a legendary relic!',
              )
            : t('No treasure could be excavated here.'),
        );
      }
      selectOption(value);
    };

    const specialMenu = (
      <BuildingMenu
        options={specialOptions.map((opt) => ({
          label: opt.label,
          value: opt.value,
          disabled: false,
        }))}
        onSelect={handleSpecialSelect}
        onCancel={back}
        hidden={buildingState.option !== null}
      />
    );

    return (
      <BuildingWrapper
        buildingId={buildingId}
        vendorMessageBox={
          specialMessage !== null
            ? {
                body: specialMessage,
                acknowledge: () => {
                  setSpecialMessage(null);
                  reset();
                },
              }
            : {
                body: t(
                  'Welcome to the residence. Select an action or press ESC to leave.',
                ),
              }
        }
        menu={specialMenu}
      />
    );
  }

  const menu = (
    <BuildingMenu
      options={options.map((option) => ({
        label:
          buildingId === '6' && option === 'Gold' ? 'Gold Funding' : option,
        value: option,
        disabled: option !== 'Sail',
      }))}
      onSelect={() => {}}
      onCancel={back}
    />
  );

  return (
    <BuildingWrapper
      buildingId={buildingId}
      vendorMessageBox={{
        body: 'This feature is not implemented yet. Press ESC to exit this building.',
      }}
      menu={menu}
    />
  );
}
