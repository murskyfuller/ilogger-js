export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
  Critical = 5,
  None = 6,
}

type LoggerMessageWithSensitivity = [string, boolean]

export interface LoggerMessage {
  error?: Error
  message: string
  [key: string]: string | LoggerMessageWithSensitivity | Error
}

export interface Logger {
  readonly name?: string
  readonly includeSensitive: boolean

  /**
   * Begins a logical operation scope.
   * @param state - The identifier for the scope.
   * @returns - The scope's id.
   */
  beginScope<TState extends LoggerScopeState>(state: TState): string

  /**
   * Ends a logical operation scope and any enclosed scopes that are
   * still active.
   * @param scopeId - Id of the scope to close.
   */
  endScope(scopeId: string)

  /**
   * Checks if the given {@link LogLevel} is enabled.
   * @param logLevel
   */
  isEnabled(logLevel: LogLevel): boolean

  /**
   * Formats and writes a log message at the specified log level.
   * @param logLevel - Entry will be written on this level.
   * @param message - Object representing all the properties of the message.
   */
  log(logLevel: LogLevel, message: LoggerMessage): void

  /**
   * Formats and writes a critical log message.
   * @param error - The exception to log.
   * @param message - Object representing all the properties of the message.
   */
  logCritical(message: LoggerMessage)

  /**
   * Formats and writes a debug log message.
   * @param message - Object representing all the properties of the message.
   */
  logDebug(message: LoggerMessage)

  /**
   * Formats and writes a error log message.
   * @param message - Object representing all the properties of the message.
   */
  logError(message: LoggerMessage)

  /**
   * Formats and writes a information log message.
   * @param message - Object representing all the properties of the message.
   */
  logInformation(message: LoggerMessage)

  /**
   * Formats and writes a trace log message.
   * @param message - Object representing all the properties of the message.
   */
  logTrace(message: LoggerMessage)

  /**
   * Formats and writes a warning log message.
   * @param message - Object representing all the properties of the message.
   */
  logWarning(message: LoggerMessage)
}

export interface LoggerScopeState {
  label?: string
  collapsed?: boolean
  messagePrefix?: string
  messageSuffix?: string
  [key: string]:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | ((...args: unknown[]) => unknown)
}
