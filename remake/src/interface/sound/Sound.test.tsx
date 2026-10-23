import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';

import Sound, { playAudio } from './Sound';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

// The asset mapper shares a module across media files; lifecycle tests need
// one playable URL, while native playback verification uses the real tracks.
jest.mock('./assets/mast-in-the-mist.ogg', () => '/bgm.ogg');

describe('playAudio', () => {
  it('accepts an interrupted play request when a new track starts loading', async () => {
    const audio = {
      play: () =>
        Promise.reject(
          new DOMException(
            'The play() request was interrupted by a new load request.',
            'AbortError',
          ),
        ),
    } as HTMLAudioElement;

    await expect(playAudio(audio)).resolves.toBe(false);
  });

  it('confirms a successful play request', async () => {
    const audio = { play: async () => {} } as HTMLAudioElement;
    await expect(playAudio(audio)).resolves.toBe(true);
  });

  it('keeps unexpected playback failures visible', async () => {
    const failure = new DOMException('Playback failed.', 'NotSupportedError');
    const audio = {
      play: () => Promise.reject(failure),
    } as HTMLAudioElement;

    await expect(playAudio(audio)).rejects.toBe(failure);
  });
});

// jsdom has no media playback. Keep real audio elements and simulate only the
// browser media boundary so the real Sound effects own playback and teardown.
describe('Sound playback ownership', () => {
  let root: Root;
  let container: HTMLDivElement;
  let created: HTMLAudioElement[];
  let playing: Set<HTMLAudioElement>;
  let sourceAssignments: Map<HTMLAudioElement, number>;

  beforeEach(() => {
    created = [];
    playing = new Set();
    sourceAssignments = new Map();
    localStorage.clear();
    jest.spyOn(window, 'Audio').mockImplementation(() => {
      const audio = document.createElement('audio');
      const src = Object.getOwnPropertyDescriptor(
        HTMLMediaElement.prototype,
        'src',
      )!;
      Object.defineProperty(audio, 'src', {
        get: () => src.get!.call(audio),
        set: (value: string) => {
          sourceAssignments.set(audio, (sourceAssignments.get(audio) ?? 0) + 1);
          src.set!.call(audio, value);
          if (audio.autoplay) playing.add(audio);
        },
      });
      jest.spyOn(audio, 'play').mockImplementation(async () => {
        playing.add(audio);
      });
      jest.spyOn(audio, 'pause').mockImplementation(() => {
        playing.delete(audio);
      });
      jest.spyOn(audio, 'load').mockImplementation(() => {
        playing.delete(audio);
      });
      created.push(audio);
      return audio;
    });
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.restoreAllMocks();
  });

  it('keeps only the current BGM after repeated load-style remounts', () => {
    const currentRoot = root;
    for (let generation = 0; generation < 4; generation += 1) {
      act(() => {
        currentRoot.render(
          <Sound
            key={generation}
            portId={generation % 2 === 0 ? '1' : null}
            buildingId={null}
          />,
        );
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('click'));
      });

      expect(playing.size).toBe(1);
      expect([...playing][0].src).toBe('http://localhost/bgm.ogg');
    }
  });

  it('stops playback and releases its source on unmount', () => {
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    const active = [...playing][0];
    expect(playing.size).toBe(1);

    act(() => root.render(null));
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });

    expect(playing.size).toBe(0);
    expect(active.getAttribute('src')).toBeNull();
  });

  it('reuses one audio element across rerenders and track changes', () => {
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    const original = created[0];
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    act(() => root.render(<Sound portId="1" buildingId="2" />));
    act(() => root.render(<Sound portId={null} buildingId={null} />));

    expect(created).toHaveLength(1);
    expect([...playing]).toEqual([original]);
    expect(original.src).toBe('http://localhost/bgm.ogg');
  });

  it('cleans up playback after the StrictMode effect restart', () => {
    act(() =>
      root.render(
        <React.StrictMode>
          <Sound portId="1" buildingId={null} />
        </React.StrictMode>,
      ),
    );
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    expect(playing.size).toBe(1);

    act(() => root.render(null));
    expect(playing.size).toBe(0);
    expect(created.every((audio) => !audio.getAttribute('src'))).toBe(true);
  });

  it('remembers mute across load and new-game remounts', () => {
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    expect(created[0].muted).toBe(false);
    act(() => {
      container.firstElementChild!.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    });
    expect(created[0].muted).toBe(true);
    expect(localStorage.getItem('uw2.bgm')).toBe('false');

    const currentRoot = root;
    for (let generation = 1; generation <= 2; generation += 1) {
      act(() =>
        currentRoot.render(
          <Sound key={generation} portId={null} buildingId={null} />,
        ),
      );
      expect(created[generation].muted).toBe(true);
    }
  });

  it('starts muted from a previous application session and remembers enabling', () => {
    localStorage.setItem('uw2.bgm', 'false');
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    expect(created[0].muted).toBe(true);
    act(() => {
      container.firstElementChild!.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    });
    expect(created[0].muted).toBe(false);
    expect(localStorage.getItem('uw2.bgm')).toBe('true');
  });

  it('keeps the in-memory toggle usable when storage is denied', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage denied.', 'SecurityError');
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage denied.', 'SecurityError');
    });
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    expect(created[0].muted).toBe(false);
    act(() => {
      container.firstElementChild!.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    });
    expect(created[0].muted).toBe(true);
  });

  it('does not reload the same relative track across location changes', () => {
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    const audio = created[0];
    audio.currentTime = 18;
    act(() => root.render(<Sound portId="1" buildingId="1" />));
    act(() => root.render(<Sound portId="2" buildingId={null} />));
    expect(sourceAssignments.get(audio)).toBe(1);
    expect(audio.currentTime).toBe(18);
  });

  it('retries on the next input after autoplay is denied', async () => {
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    const audio = created[0];
    jest
      .mocked(audio.play)
      .mockRejectedValueOnce(
        new DOMException('User activation required.', 'NotAllowedError'),
      );
    await act(async () => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown'));
    });
    expect(audio.play).toHaveBeenCalledTimes(2);
    await act(async () => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    expect(audio.play).toHaveBeenCalledTimes(2);
  });

  it('keeps a pending play request unique and handles cancellation on cleanup', async () => {
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    const audio = created[0];
    let cancel!: (reason: DOMException) => void;
    jest.mocked(audio.play).mockImplementation(
      () =>
        new Promise((_resolve, reject) => {
          cancel = reject;
        }),
    );
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
      window.dispatchEvent(new KeyboardEvent('keydown'));
    });
    expect(audio.play).toHaveBeenCalledTimes(1);
    await act(async () => {
      root.render(null);
      cancel(new DOMException('Source released.', 'AbortError'));
    });
    expect(playing.size).toBe(0);
    expect(audio.getAttribute('src')).toBeNull();
  });

  it('reports unsupported playback at the input boundary and permits another try', async () => {
    const report = jest.spyOn(console, 'error').mockImplementation(() => {});
    act(() => root.render(<Sound portId="1" buildingId={null} />));
    const audio = created[0];
    const failure = new DOMException('Unsupported track.', 'NotSupportedError');
    jest.mocked(audio.play).mockRejectedValueOnce(failure);
    await act(async () => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    expect(report).toHaveBeenCalledWith(expect.any(String), failure);
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown'));
    });
    expect(audio.play).toHaveBeenCalledTimes(2);
  });
});
