/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 *
 * The `@kz/core/observer` module provides types and features for implementing
 * the observer pattern.
 *
 * The observer pattern is a software design pattern in which an object, called
 * the subject or observable, maintains a list of its dependents, called
 * observers, and notifies them of state changes, usually by calling one of
 * their methods.
 *
 * ```ts
 * import { TAbstractObserver, TBaseObservable } from './mod.ts';
 *
 * interface ILocation {
 *   lat: number;
 *   lon: number;
 * }
 *
 * class LocationReporter extends TBaseObservable<ILocation> {
 *   public publish(location: ILocation): void {
 *     try {
 *       if (location.lat < -90 || location.lat > 90) {
 *         throw new Error('Invalid latitude');
 *       }
 *
 *       super.publish(location);
 *     } catch (error) {
 *       this.onError(error);
 *     }
 *   }
 * }
 *
 * class LocationTracker extends TAbstractObserver<ILocation> {
 *   protected _locations: ILocation[] = [];
 *
 *   public get locations(): ILocation[] {
 *     return this._locations;
 *   }
 *
 *   public next(location: ILocation): void {
 *     if (this.subscription && this.subscription.isDisposed) return;
 *
 *     this._locations.push(location);
 *   }
 *
 *   public error(error: Error): void {
 *     console.log(error.message);
 *   }
 * }
 *
 * const reporter = new LocationReporter();
 * const localTracker = new LocationTracker();
 * const remoteTracker = new LocationTracker();
 *
 * const localSub = reporter.subscribe(localTracker);
 * const remoteSub = reporter.subscribe(remoteTracker);
 *
 * reporter.publish({ lat: 37.7749, lon: -122.4194 });
 * reporter.publish({ lat: 40.7128, lon: -74.0060 });
 *
 * console.log(localTracker.locations.length); // 2
 * console.log(remoteTracker.locations.length); // 2
 *
 * localSub.dispose();
 *
 * reporter.publish({ lat: 51.5074, lon: -0.1278 });
 *
 * remoteSub.dispose();
 *
 * console.log(localTracker.locations.length); // 2
 * console.log(remoteTracker.locations.length); // 3
```
 * @module observer
 */

export * from './types/mod.ts';
export { TBaseObservable } from './t_base_observable.ts';
export { TAbstractObserver } from './t_abstract_observer.ts';
export { TSubscription } from './t_subscription.ts';
