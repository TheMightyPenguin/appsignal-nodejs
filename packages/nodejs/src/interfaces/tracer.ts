import { EventEmitter } from "events"

import { Span, SpanOptions } from "./span"
import { SpanContext } from "./context"
import { Func } from "../types/utils"

export interface Tracer {
  /**
   * Creates a new `Span` instance. If a `Span` is passed as the optional second
   * argument, then the returned `Span` will be a `ChildSpan`.
   */
  createSpan(options?: Partial<SpanOptions>, span?: Span): Span

  /**
   * Creates a new `Span` instance. If a `SpanContext` is passed as the optional second
   * argument, then the returned `Span` will be a `ChildSpan`.
   */
  createSpan(options?: Partial<SpanOptions>, context?: SpanContext): Span

  /**
   * Returns the current Span.
   *
   * If there is no current Span available, `undefined` is returned.
   */
  currentSpan(): Span

  /**
   * Executes a given function asynchronously within the context of a given
   * `Span`. When the function has finished executing, any value returned by
   * the given function is returned, but the `Span` remains active unless it is
   * explicitly closed.
   *
   * The `Span` is passed as the single argument to the given function. This
   * allows you to create children of the `Span` for instrumenting nested
   * operations.
   */
  withSpan<T>(span: Span, fn: (s: Span) => T): T

  /**
   * Wraps a given function in the current `Span`s scope.
   */
  wrap<T>(fn: Func<T>): Func<T>

  /**
   * Wraps an `EventEmitter` in the current `Span`s scope.
   */
  wrapEmitter(emitter: EventEmitter): void
}
