/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import { SpeakerXMarkIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

import { getRegionOrIfSupplyPort } from '../../game/port/portUtils';

import mastInTheMist from './assets/mast-in-the-mist.ogg';
import themeOfJoao from './assets/theme-of-joão.ogg';
import fiddlersGreen from './assets/fiddlers-green.ogg';
import royalPalace from './assets/royal-palace.ogg';
import supplyPort from './assets/supply-port.ogg';
import emptyEyes from './assets/empty-eyes.ogg';
import theMahout from './assets/the-mahout.ogg';
import landOfLuxury from './assets/land-of-luxury.ogg';
import moslemDance from './assets/moslem-dance.mp3';

/*
  https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide

  Loading a save remounts Left, including Sound. Each instance must release
  its own looping audio so the previous track cannot survive that remount.
 */

const getAudioElement = () => {
  const audio = new Audio();
  audio.loop = true;
  audio.autoplay = true;
  return audio;
};

const getTrack = ({ portId, buildingId }: Props) => {
  if (portId === null) {
    return themeOfJoao;
  }

  if (buildingId === '2') {
    return fiddlersGreen;
  }

  if (buildingId === '6') {
    return royalPalace;
  }

  const region = getRegionOrIfSupplyPort(portId);

  if (region === 'Supply port') {
    return supplyPort;
  }

  if (['Ottoman Empire', 'Middle East'].includes(region)) {
    return moslemDance;
  }

  if (
    [
      'North Africa',
      'East Africa',
      'West Africa',
      'Central America',
      'South America',
    ].includes(region)
  ) {
    return emptyEyes;
  }

  if (['India'].includes(region)) {
    return theMahout;
  }

  if (['Southeast Asia', 'Far East'].includes(region)) {
    return landOfLuxury;
  }

  return mastInTheMist;
};

interface Props {
  portId: string | null;
  buildingId: string | null;
}

export const playAudio = async (audio: HTMLAudioElement) => {
  try {
    await audio.play();
    return true;
  } catch (error) {
    // Changing tracks cancels an in-flight play request in Chromium. That
    // cancellation is expected; every other playback failure remains visible.
    if (!(error instanceof DOMException) || error.name !== 'AbortError') {
      throw error;
    }
    return false;
  }
};

export default function Sound({ portId, buildingId }: Props) {
  const [audio] = useState(getAudioElement);
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem('uw2.bgm') !== 'false';
    } catch {
      return true;
    }
  });

  useEffect(
    () => () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    },
    [audio],
  );

  useEffect(() => {
    audio.muted = !soundOn;
    try {
      localStorage.setItem('uw2.bgm', String(soundOn));
    } catch {
      // Storage can be disabled; the in-memory toggle still works.
    }
  }, [audio, soundOn]);

  useEffect(() => {
    const track = getTrack({
      portId,
      buildingId,
    });

    // without this check, the track will play from the beginning
    if (audio.getAttribute('src') !== track) {
      audio.src = track;
    }
  }, [audio, portId, buildingId]);

  useEffect(() => {
    let hasPlayed = false;
    let pending = false;

    const triggerAutoplay = () => {
      if (hasPlayed || pending) return;
      pending = true;
      playAudio(audio)
        .then((played) => {
          hasPlayed = played;
        })
        .catch((error: unknown) => {
          // Autoplay denial needs another user gesture; other errors need a
          // visible diagnostic instead of an unhandled event-handler promise.
          if (
            !(error instanceof DOMException) ||
            error.name !== 'NotAllowedError'
          ) {
            // eslint-disable-next-line no-console -- Event handlers cannot propagate playback rejections.
            console.error('BGM playback failed.', error);
          }
        })
        .finally(() => {
          pending = false;
        });
    };

    window.addEventListener('click', triggerAutoplay);
    window.addEventListener('keydown', triggerAutoplay);

    return () => {
      window.removeEventListener('click', triggerAutoplay);
      window.removeEventListener('keydown', triggerAutoplay);
    };
  }, [audio]);

  return (
    <div
      className="select-none cursor-pointer p-2 inline-block align-bottom"
      onClick={() => setSoundOn((enabled) => !enabled)}
    >
      {soundOn && <SpeakerWaveIcon className="h-8 w-8 text-lime-400" />}
      {!soundOn && <SpeakerXMarkIcon className="h-8 w-8 text-red-600" />}
    </div>
  );
}

/*
 TODO
  Fall back to mp3 if ogg is not supported, using HTMLMediaElement.canPlayType()
  require.context() may come in handy

 TODO fade
 */
