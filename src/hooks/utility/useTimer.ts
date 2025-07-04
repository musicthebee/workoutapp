// src/hooks/utility/useTimer.ts
import { useCallback, useEffect, useRef, useState } from 'react';

export type TimerMode = 'countdown' | 'stopwatch';
export type TimerFormat = 'mm:ss' | 'hh:mm:ss' | 'seconds';

interface UseTimerOptions {
  mode?: TimerMode;
  initial_seconds?: number;
  format?: TimerFormat;
  on_complete?: () => void;
  on_tick?: (seconds: number) => void;
  auto_start?: boolean;
}

interface TimerState {
  seconds: number;
  is_running: boolean;
  is_complete: boolean;
}

/**
 * Generic timer hook for countdown and stopwatch functionality
 * Used for rest timers, workout duration, exercise timers, etc.
 */
export const useTimer = (options: UseTimerOptions = {}) => {
  const {
    mode = 'countdown',
    initial_seconds = 0,
    format = 'mm:ss',
    on_complete,
    on_tick,
    auto_start = false,
  } = options;

  // State
  const [state, setState] = useState<TimerState>({
    seconds: initial_seconds,
    is_running: auto_start,
    is_complete: false,
  });

  // Refs to avoid stale closures
  const interval_ref = useRef<NodeJS.Timeout | null>(null);
  const on_complete_ref = useRef(on_complete);
  const on_tick_ref = useRef(on_tick);

  // Update refs when callbacks change
  useEffect(() => {
    on_complete_ref.current = on_complete;
    on_tick_ref.current = on_tick;
  }, [on_complete, on_tick]);

  // Format time based on format option
  const format_time = useCallback(
    (seconds: number): string => {
      if (format === 'seconds') {
        return seconds.toString();
      }

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      if (format === 'hh:mm:ss') {
        return [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          secs.toString().padStart(2, '0'),
        ].join(':');
      }

      // mm:ss format
      const total_minutes = Math.floor(seconds / 60);
      return [total_minutes.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(
        ':',
      );
    },
    [format],
  );

  // Timer logic
  useEffect(() => {
    if (state.is_running && !state.is_complete) {
      interval_ref.current = setInterval(() => {
        setState(prev => {
          let new_seconds: number;

          if (mode === 'countdown') {
            new_seconds = Math.max(0, prev.seconds - 1);
          } else {
            new_seconds = prev.seconds + 1;
          }

          // Call tick callback
          if (on_tick_ref.current) {
            on_tick_ref.current(new_seconds);
          }

          // Check completion for countdown
          const is_complete = mode === 'countdown' && new_seconds === 0;

          if (is_complete && on_complete_ref.current) {
            on_complete_ref.current();
          }

          return {
            ...prev,
            seconds: new_seconds,
            is_complete,
            is_running: !is_complete, // Auto-stop on complete
          };
        });
      }, 1000);
    } else {
      if (interval_ref.current) {
        clearInterval(interval_ref.current);
        interval_ref.current = null;
      }
    }

    return () => {
      if (interval_ref.current) {
        clearInterval(interval_ref.current);
        interval_ref.current = null;
      }
    };
  }, [state.is_running, state.is_complete, mode]);

  // Control functions
  const start = useCallback(() => {
    setState(prev => ({
      ...prev,
      is_running: true,
      is_complete: false,
    }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({
      ...prev,
      is_running: false,
    }));
  }, []);

  const resume = useCallback(() => {
    if (!state.is_complete) {
      start();
    }
  }, [state.is_complete, start]);

  const stop = useCallback(() => {
    setState({
      seconds: initial_seconds,
      is_running: false,
      is_complete: false,
    });
  }, [initial_seconds]);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      seconds: initial_seconds,
      is_complete: false,
    }));
  }, [initial_seconds]);

  const set_seconds = useCallback((seconds: number) => {
    setState(prev => ({
      ...prev,
      seconds: Math.max(0, seconds),
      is_complete: false,
    }));
  }, []);

  const add_seconds = useCallback((seconds_to_add: number) => {
    setState(prev => ({
      ...prev,
      seconds: Math.max(0, prev.seconds + seconds_to_add),
      is_complete: false,
    }));
  }, []);

  // Quick add/subtract helpers
  const add_minute = useCallback(() => add_seconds(60), [add_seconds]);
  const subtract_minute = useCallback(() => add_seconds(-60), [add_seconds]);
  const add_30_seconds = useCallback(() => add_seconds(30), [add_seconds]);
  const subtract_30_seconds = useCallback(() => add_seconds(-30), [add_seconds]);

  return {
    // State
    seconds: state.seconds,
    display: format_time(state.seconds),
    is_running: state.is_running,
    is_complete: state.is_complete,

    // Controls
    start,
    pause,
    resume,
    stop,
    reset,
    toggle: state.is_running ? pause : start,

    // Time manipulation
    set_seconds,
    add_seconds,
    add_minute,
    subtract_minute,
    add_30_seconds,
    subtract_30_seconds,

    // Computed values
    progress:
      mode === 'countdown' && initial_seconds > 0
        ? (initial_seconds - state.seconds) / initial_seconds
        : 0,
  };
};

/**
 * Hook for managing multiple timers
 * Useful for interval training or circuit workouts
 */
export const useMultiTimer = (
  timer_configs: Array<{
    name: string;
    duration: number;
    rest?: number;
  }>,
) => {
  const [current_index, setCurrentIndex] = useState(0);
  const [is_rest_phase, setIsRestPhase] = useState(false);
  const [is_complete, setIsComplete] = useState(false);

  const current_config = timer_configs[current_index];
  const current_duration = is_rest_phase
    ? current_config?.rest || 0
    : current_config?.duration || 0;

  const timer = useTimer({
    mode: 'countdown',
    initial_seconds: current_duration,
    auto_start: false,
    on_complete: () => {
      if (is_rest_phase) {
        // Move to next exercise
        if (current_index < timer_configs.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setIsRestPhase(false);
        } else {
          setIsComplete(true);
        }
      } else {
        // Move to rest phase or next exercise
        if (current_config?.rest && current_config.rest > 0) {
          setIsRestPhase(true);
        } else if (current_index < timer_configs.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsComplete(true);
        }
      }
    },
  });

  // Reset timer when phase changes
  useEffect(() => {
    timer.set_seconds(current_duration);
    if (!is_complete) {
      timer.start();
    }
  }, [current_index, is_rest_phase, current_duration]);

  const skip_current = useCallback(() => {
    timer.stop();
    if (is_rest_phase || !current_config?.rest) {
      if (current_index < timer_configs.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsRestPhase(false);
      } else {
        setIsComplete(true);
      }
    } else {
      setIsRestPhase(true);
    }
  }, [current_index, is_rest_phase, timer_configs.length, current_config]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setIsRestPhase(false);
    setIsComplete(false);
    timer.reset();
  }, [timer]);

  return {
    ...timer,
    current_index,
    current_name: current_config?.name || '',
    is_rest_phase,
    is_complete,
    total_timers: timer_configs.length,
    skip_current,
    restart,
    progress_overall: (current_index + (is_rest_phase ? 0.5 : 0)) / timer_configs.length,
  };
};

/**
 * Simple stopwatch hook
 * Tracks elapsed time for workout duration
 */
export const useStopwatch = (auto_start = false) => {
  return useTimer({
    mode: 'stopwatch',
    initial_seconds: 0,
    auto_start,
  });
};
