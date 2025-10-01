import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

type TimeStatus = 'idle' | 'running' | 'paused';

const useTimer = (timeSecond: number) => {
  const timerID = useRef<NodeJS.Timeout | null>(null);
  const [timerStatus, setTimerStatus] = useState<TimeStatus>('idle');
  const [time, setTime] = useState(0);

  const startTimer = () => {
    if (timerStatus === 'running') {
      return;
    }

    if (timerStatus === 'idle') {
      setTime(timeSecond);
    }

    setTimerStatus('running');
  };

  const resetTimer = () => {
    if (timerStatus === 'idle') {
      return;
    }

    setTime(0);
    setTimerStatus('idle');
  };

  const pauseAndResumeTimer = () => {
    if (timerStatus === 'idle') {
      return;
    }

    setTimerStatus(timerStatus === 'running' ? 'paused' : 'running');
  };

  const runTimer = () => {
    timerID.current = setInterval(() => {
      setTime(prevTime => (prevTime - 1 < 0 ? 0 : prevTime - 1));
    }, 1_000);
  };

  const clearTimer = () => {
    if (timerID.current) {
      clearTimeout(timerID.current);
      timerID.current = null;
    }
  };

  useEffect(() => {
    if (timerStatus === 'running') {
      if (timerID.current === null) {
        runTimer();
      }
    } else {
      clearTimer();
    }
  }, [timerStatus, timerID]);

  useEffect(() => {
    if (timerStatus === 'running' && time <= 0) {
      clearTimer();
      setTimerStatus('idle');
    }
  }, [time, timerStatus]);

  useEffect(() => {
    if (timerID.current) {
      return () => clearTimer();
    }
  }, []);

  return {
    time,
    startTimer,
    resetTimer,
    pauseAndResumeTimer,
  };
};

const Timer = ({ timeSecond }: { timeSecond: number }) => {
  const { time, startTimer, resetTimer, pauseAndResumeTimer } = useTimer(timeSecond);

  const timeFormatted = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedTime}:${formattedSeconds}`;
  };

  return (
    <div className={'flex justify-center items-center w-full gap-5 mt-5'}>
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
        }}
        onClick={() => startTimer()}
      >
        START
      </button>
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
        }}
        onClick={() => pauseAndResumeTimer()}
      >
        PAUSE / RESUME
      </button>

      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
        }}
        onClick={() => resetTimer()}
      >
        RESET
      </button>

      <h1 data-testid="running-clock">{timeFormatted(time)}</h1>
    </div>
  );
};

const Test = () => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const handleUpdateMinute = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinute(Number(value));
  };

  const handleUpdateSecond = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecond(Number(value));
  };

  const totalSecond = useMemo(() => minute * 60 + second, [minute, second]);

  return (
    <div>
      <div className={'flex justify-center items-center w-full gap-5'}>
        <div>
          <label className={'flex gap-2 items-center'}>
            <input
              type="number"
              className={'w-16 border border-gray-300 rounded-md p-1 text-center'}
              onChange={handleUpdateMinute}
              value={minute}
              min={0}
            />
            분
          </label>
        </div>
        <div>
          <label className={'flex gap-2 items-center'}>
            <input
              type="number"
              className={'w-16 border border-gray-300 rounded-md p-1 text-center'}
              onChange={handleUpdateSecond}
              value={second}
              min={0}
            />
            초
          </label>
        </div>
      </div>
      <Timer timeSecond={totalSecond} />
    </div>
  );
};

export default Test;
