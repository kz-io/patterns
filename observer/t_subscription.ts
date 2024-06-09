/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the TSubscription class.
 */

import type { IDisposable } from '../dispose/mod.ts';
import type { TObserver } from './types/mod.ts';

/**
 * Provides a mechanism to unsubscribe an observer from an observable.
 *
 * @typeParam T - The type of the value being observed.
 */
export class TSubscription<T> implements IDisposable {
  /**
   * Initializes a new instance of the {@link TSubscription} class.
   *
   * @param observers - The observers that are subscribed to the observable.
   * @param observer - The current observer to subscribe.
   */
  constructor(
    protected observers: TObserver<T>[],
    protected observer: TObserver<T>,
  ) {
  }

  /**
   * Whether the subscription has been disposed.
   */
  public get isDisposed(): boolean {
    const { observers } = this;

    return !observers.length;
  }

  /**
   * Disposes the subscription, unsubscribing the observer from the observable.
   */
  public dispose(): void {
    const { observers } = this;

    const index = observers.indexOf(this.observer);

    if (index >= 0) {
      observers.splice(index, 1);
    }
  }
}
