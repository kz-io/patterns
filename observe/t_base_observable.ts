/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the AbstractObservable abstract class.
 */

import { TSubscription } from './t_subscription.ts';

import type { IDisposable } from '../dispose/mod.ts';
import type { TObservable, TObserver } from './types/mod.ts';

/**
 * A base implementation for the {@link TObservable} interface.
 *
 * @typeParam T - The type of the value being observed.
 */
export class TBaseObservable<T> implements TObservable<T> {
  /**
   * The observers that are subscribed to the observable.
   */
  protected observers: TObserver<T>[] = [];

  /**
   * Subscribes an observer to the observable, returning an {@link IDisposable} instance that can be used to unsubscribe the observer.
   *
   * @param observer The observer to subscribe.
   * @returns An {@link IDisposable} instance that can be used to unsubscribe the observer.
   */
  public subscribe(observer: TObserver<T>): IDisposable {
    this.observers.push(observer);

    return new TSubscription(this.observers, observer);
  }

  /**
   * Pushes a value to all subscribed observers.
   *
   * @param value The value to push to the subscribed observers.
   */
  public publish(value: T): void {
    const { observers } = this;

    for (const observer of observers) {
      observer.next(value);
    }
  }

  /**
   * Notifies all subscribed observers that an error has occurred.
   *
   * @param error The error that occurred.
   */
  protected onError(error: Error): void {
    const { observers } = this;

    for (const observer of observers) {
      observer.error(error);
    }
  }

  /**
   * Notifies all subscribed observers that the observable has completed.
   */
  public complete(): void {
    const { observers } = this;

    for (const observer of observers) {
      observer.complete();
    }

    observers.length = 0;
  }
}
