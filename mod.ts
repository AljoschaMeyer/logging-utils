/**
 * Utilities for pretty logging. Just basic string formatting, no actual IO.
 *
 * @module
 */

import * as Colors from "@std/fmt/colors";

/**
 * Different logging levels, in ascending order of priority.
 *
 * - `debug`: Temporarily added logging calls for debugging. Should be removed before release.
 * - `trace`: Information about the flow of logic in some code.
 * - `info`: Interesting but non-critical, user-facing information.
 * - `warn`: Inform about recoverable but undesirable state.
 * - `error`: Information about an irrecoverable fault.
 */
export type LogLevel = "debug" | "trace" | "info" | "warn" | "error";

function levelToInt(level: LogLevel): number {
  if (level === "debug") {
    return 0;
  } else if (level === "trace") {
    return 1;
  } else if (level === "info") {
    return 2;
  } else if (level === "warn") {
    return 3;
  } else {
    return 4;
  }
}

/**
 * Return if the first logging level is of strictly lower priority than the
 * second logging level.
 */
export function logLt(fst: LogLevel, snd: LogLevel): boolean {
  return levelToInt(fst) < levelToInt(snd);
}

/**
 * Return if the first logging level is of lower or equal priority as the
 * second logging level.
 */
export function logLte(fst: LogLevel, snd: LogLevel): boolean {
  return levelToInt(fst) <= levelToInt(snd);
}

/**
 * Return if the first logging level is of strictly greater priority than the
 * second logging level.
 */
export function logGt(fst: LogLevel, snd: LogLevel): boolean {
  return levelToInt(fst) > levelToInt(snd);
}

/**
 * Return if the first logging level is of greater or equal priority as the
 * second logging level.
 */
export function logGte(fst: LogLevel, snd: LogLevel): boolean {
  return levelToInt(fst) >= levelToInt(snd);
}

type LevelInfo = {
  styleFn: (str: string) => string;
  label: string;
};

const infos: LevelInfo[] = [
  {
    styleFn: Colors.magenta,
    label: "debug",
  },
  {
    styleFn: Colors.blue,
    label: "trace",
  },
  {
    styleFn: Colors.green,
    label: "info",
  },
  {
    styleFn: Colors.yellow,
    label: "warn",
  },
  {
    styleFn: Colors.red,
    label: "error",
  },
];

/**
 * Return a string with which to prefix a call to `console.log` (or similar)
 * that reflects logging level and indentation depth.
 * @param level - The logging level at which to log.
 * @param groupDepth - How far to indent to indicate grouping of several
 * logging calls.
 */
export function renderMessagePrefix(level: LogLevel, groupDepth = 0): string {
  const i = levelToInt(level);
  const padding = i === 2 || i === 3 ? " " : "";
  return `${infos[i].styleFn(`[${infos[i].label}]`)}${padding}${
    "    ".repeat(groupDepth)
  }`;
}
