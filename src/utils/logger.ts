import pino from 'pino';
import { PrettyOptions } from 'pino-pretty';

// https://www.npmjs.com/package/pino-pretty#options
export const LoggerConfig: PrettyOptions = {
  // redact,
  // serializers,
  // timestamp,
  // base,
  // name,
  // level,
  levelFirst: false,
  // customLevels,
  // useLevelLabels,
  // changeLevelName,
  // useOnlyCustomLevels
  // crlf: false, // --crlf
  ignore: 'pid,hostname', // --ignore
  //messageFormat: '{levelLabel} - kalle - url:{request.url}',
  // messageKey: 'msg', // --messageKey
  timestampKey: 'time', // --timestampKey
  translateTime: 'SYS:dd-mm-yyyy HH:MM:ss', // --translateTime
};

const transport = pino.transport({
  target: 'pino-pretty',
  options: LoggerConfig,
});

export const logger = pino({}, transport);

export const loggerqq = pino({
  transport: {
    target: 'pino-pretty',
  },
  options: {
    colorize: true,
  },
  //prettyPrint: LoggerConfig,
});
