/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the AbstractObserver abstract class.
 */

import type { IDisposable } from '../dispose/mod.ts';
import type { TObservable, TObserver } from './types/mod.ts';

/**
 * A base abstract implementation for the {@link TObserver} interface.
 *
 * @typeParam T - The type of the value being observed.
 */
export abstract class TAbstractObserver<T> implements TObserver<T> {
  /**
   * The subscription instance that can be used to unsubscribe the observer from the observable.
   */
  protected subscription?: IDisposable;

  /**
   * Receives a value from the observable.
   *
   * @param value - The value being observed.
   */
  public abstract next(value: T): void;

  /**
   * Receives an error from the observable.
   *
   * @param error - The error that occurred.
   */
  public abstract error(error: Error): void;

  /**
   * Receives a completion notification from the observable.
   */
  public complete(): void {
    this.unsubscribe();
  }

  /**
   * Subscribes the observer to the specified observable.
   *
   * @param observable The observable to subscribe to.
   */
  public subscribe(observable: TObservable<T>): IDisposable {
    return this.subscription = observable.subscribe(this);
  }

  /**
   * Unsubscribes the observer from the observable.
   */
  public unsubscribe(): void {
    const { subscription } = this;

    if (subscription) {
      subscription.dispose();
    }
  }
}
