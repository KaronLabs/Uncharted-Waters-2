import React, { useState } from 'react';

import Assets from '../../assets';
import { classNames } from '../interfaceUtils';
import updateInterface from '../../state/updateInterface';
import { getPlayerFleet } from '../../state/selectorsFleet';
import { getProvisionSummary, ProvisionSummary } from '../../state/provisions';
import {
  canExcavateTreasure,
  excavateTreasure,
} from '../../state/actionsOriginalCore';
import state from '../../state/state';
import { t } from '../../localization';

/*
  The icons are 16x32 pixel art drawn at their native size. At the 2x they used
  to be drawn at, four rows came to 320px — over a third of the 800px the whole
  HUD column has — and pushed the bottom of the column out past the game frame.
  Halving is the only step down that keeps whole source pixels; 1.5x would
  double some columns of a 16px-wide sprite and not others.
 */
const iconClass = 'w-4 h-8';
const provisionClass = 'flex items-center py-1';
const quantityClass = 'flex-1 text-right text-xl';

interface Props {
  hidden: boolean;
}

export const getProvisionStatusText = ({
  dailyConsumption,
  daysRemaining,
  status,
}: ProvisionSummary): string | null => {
  if (dailyConsumption === 0 || daysRemaining === null) {
    return null;
  }
  if (status === 'exhausted') {
    return t('Supplies exhausted');
  }
  if (daysRemaining === 0) {
    return t('Less than 1 day remaining');
  }
  if (status === 'low') {
    return t(
      daysRemaining === 1
        ? 'Only {days} day remaining'
        : 'Only {days} days remaining',
      { days: daysRemaining },
    );
  }
  return t('{days} days remaining', { days: daysRemaining });
};

export const getStarvationReportText = ({
  crewLosses,
  adrift,
}: ProvisionSummary): string | null => {
  const deaths = (crewLosses ?? []).reduce(
    (total, loss) => total + loss.deaths,
    0,
  );

  if (deaths === 0) {
    return null;
  }

  const lost = t(
    deaths === 1
      ? 'Lost {deaths} crew member to starvation'
      : 'Lost {deaths} crew members to starvation',
    { deaths },
  );

  return adrift ? t('{lost} — the fleet drifted into port', { lost }) : lost;
};

export default function Provisions({ hidden }: Props) {
  const [summary, setSummary] = useState<ProvisionSummary>(() =>
    getProvisionSummary(getPlayerFleet()),
  );
  const [ashoreOpen, setAshoreOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  updateInterface.provisions = (nextSummary) => {
    setSummary(nextSummary);
  };

  const hasTreasureMap =
    (state.items ?? []).includes('87') || (state.items ?? []).includes('88');
  const excavatableId = ['p1-gold-medallion', 'p2-poseidons-staff'].find((id) =>
    canExcavateTreasure(id),
  );

  const handleSearch = () => {
    const targetId = ['p1-gold-medallion', 'p2-poseidons-staff'].find((id) =>
      canExcavateTreasure(id),
    );
    if (targetId && excavateTreasure(targetId)) {
      setSearchResult(
        t(
          'Following the treasure map, your expedition excavated a legendary relic!',
        ),
      );
    } else {
      setSearchResult(t('No treasure could be excavated here.'));
    }
  };

  const { water, food, lumber, shot } = summary.provisions;
  let warningClass = '';

  if (summary.status === 'exhausted') {
    warningClass = 'text-red-600';
  } else if (summary.status === 'low') {
    warningClass = 'text-orange-500';
  }
  const statusText = getProvisionStatusText(summary);
  const starvationText = getStarvationReportText(summary);

  return (
    <div
      className={classNames('mt-4', hidden ? 'hidden' : '')}
      data-test="provisions"
    >
      <div className="text-sm mb-2">{t('Provisions')}</div>
      {!!statusText && (
        <div
          className={classNames('text-sm mb-1', warningClass)}
          data-test="provisionStatus"
        >
          {statusText}
        </div>
      )}
      {!!starvationText && (
        <div
          className="text-xs leading-tight mb-1 text-red-600"
          data-test="provisionStarvation"
        >
          {starvationText}
        </div>
      )}
      <div className={classNames(provisionClass, warningClass)}>
        <img
          src={Assets.images('worldWater').toDataURL()}
          alt={t('Water')}
          className={iconClass}
        />
        <div className={quantityClass} data-test="provision-water">
          {water}
        </div>
      </div>
      <div className={classNames(provisionClass, warningClass)}>
        <img
          src={Assets.images('worldFood').toDataURL()}
          alt={t('Food')}
          className={iconClass}
        />
        <div className={quantityClass} data-test="provision-food">
          {food}
        </div>
      </div>
      <div className={provisionClass}>
        <img
          src={Assets.images('worldLumber').toDataURL()}
          alt={t('Lumber')}
          className={iconClass}
        />
        <div className={quantityClass}>{lumber}</div>
      </div>
      <div className={provisionClass}>
        <img
          src={Assets.images('worldShot').toDataURL()}
          alt={t('Shot')}
          className={iconClass}
        />
        <div className={quantityClass}>{shot}</div>
      </div>
      {(hasTreasureMap || excavatableId || ashoreOpen || searchResult) && (
        <div
          className="mt-3 border-t border-stone-700 pt-2"
          data-test="sea-ashore-panel"
        >
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="rounded bg-amber-800 px-2 py-1 text-xs text-white"
              data-test="sea-go-ashore"
              onClick={() => {
                setAshoreOpen(true);
                setSearchResult(null);
              }}
            >
              {t('Go Ashore')}
            </button>
            {(ashoreOpen || Boolean(excavatableId)) && (
              <button
                type="button"
                className="rounded bg-emerald-800 px-2 py-1 text-xs text-white"
                data-test="sea-search-treasure"
                onClick={handleSearch}
              >
                {t('Search')}
              </button>
            )}
            {searchResult && (
              <div
                className="text-xs text-amber-200 mt-1"
                data-test="sea-excavation-result"
              >
                {searchResult}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
