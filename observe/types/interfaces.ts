/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Interfaces for the module. For type aliases see ./type-aliases.ts.
 */

import type { IDisposable } from '../../dispose/mod.ts';

/**
 * Provides a mechanism to push notifications to subscribed {@link TObserver} instances.
 *
 * @typeParam T - The type of the value being observed.
 */
export interface TObservable<T> {
  /**
   * Pushes a value to all subscribed observers.
   *
   * @param value - The value to push to the subscribed observers.
   */
  publish(value: T): void;

  /**
   * Subscribes an observer to the observable, returning an {@link IDisposable} instance that can be used to unsubscribe the observer.
   *
   * @param observer - The observer to subscribe.
   */
  subscribe(observer: TObserver<T>): IDisposable;

  /**
   * Notifies all subscribed observers that the observable has completed.
   */
  complete(): void;
}

/**
 * Provides a mechanism to receive notifications from an {@link TObservable} instance.
 *
 * @typeParam T - The type of the value being observed.
 */
export interface TObserver<T> {
  /**
   * Receives a value from the observable.
   *
   * @param value - The value being observed.
   */
  next(value: T): void;

  /**
   * Receives an error from the observable.
   *
   * @param error - The error that occurred.
   */
  error(error: Error): void;

  /**
   * Receives a completion notification from the observable.
   */
  complete(): void;
}
