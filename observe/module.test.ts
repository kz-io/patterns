/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the features of the module.
 */

import { describe, it } from '@std/testing/bdd';
import { assertSpyCalls, spy } from '@std/testing/mock';
import { assertEquals } from '@std/assert';

import { TAbstractObserver, TBaseObservable } from './mod.ts';

import type { IDisposable } from '../dispose/mod.ts';

interface ILocation {
  lat: number;
  lon: number;
}

class LocationReporter extends TBaseObservable<ILocation> {
  public reportLocation(location: ILocation): void {
    try {
      if (location.lat < -90 || location.lat > 90) {
        throw new Error('Invalid latitude');
      }

      this.publish(location);
    } catch (error) {
      this.onError(error);
    }
  }
}

class LocationTracker extends TAbstractObserver<ILocation> {
  protected _locations: ILocation[] = [];

  public get locations(): ILocation[] {
    return this._locations;
  }

  public next(location: ILocation): void {
    if (this.subscription && this.subscription.isDisposed) return;

    this._locations.push(location);
  }

  public error(error: Error): void {
    console.log(error.message);
  }
}

describe('observe', () => {
  describe('TBaseObservable', () => {
    const reporter = new LocationReporter();
    const trackerOrg1 = new LocationTracker();
    const trackerOrg2 = new LocationTracker();
    const trackerOrg3 = new LocationTracker();
    let sub1: IDisposable;
    let sub2: IDisposable;
    let sub3: IDisposable;

    it('should subscribe observers', () => {
      sub1 = reporter.subscribe(trackerOrg1);
      sub2 = reporter.subscribe(trackerOrg2);
      sub3 = reporter.subscribe(trackerOrg3);

      assertEquals(sub1.isDisposed, false);
      assertEquals(sub2.isDisposed, false);
      assertEquals(sub3.isDisposed, false);
    });

    it('should publish values to all subscribed observers', () => {
      const location = { lat: 37.7749, lon: 122.4194 };

      reporter.reportLocation(location);

      assertEquals(trackerOrg1.locations.length, 1);
      assertEquals(trackerOrg2.locations.length, 1);
      assertEquals(trackerOrg3.locations.length, 1);
    });

    it('should notify of error', () => {
      const consoleSpy = spy(console, 'log');

      reporter.reportLocation({ lat: 100, lon: 100 });

      assertSpyCalls(consoleSpy, 3);

      consoleSpy.restore();
    });

    it('should complete', () => {
      reporter.complete();

      assertEquals(trackerOrg1.locations.length, 1);
      assertEquals(trackerOrg2.locations.length, 1);
      assertEquals(trackerOrg3.locations.length, 1);
      assertEquals(sub1!.isDisposed, true);
      assertEquals(sub2!.isDisposed, true);
      assertEquals(sub3!.isDisposed, true);
    });
  });

  describe('TAbstractObserver', () => {
    const reporter = new LocationReporter();
    const trackerOrg1 = new LocationTracker();
    const trackerOrg2 = new LocationTracker();
    const trackerOrg3 = new LocationTracker();
    let sub1: IDisposable;
    let sub2: IDisposable;
    let sub3: IDisposable;

    it('should subscribe observers', () => {
      sub1 = trackerOrg1.subscribe(reporter);
      sub2 = trackerOrg2.subscribe(reporter);
      sub3 = trackerOrg3.subscribe(reporter);

      assertEquals(sub1.isDisposed, false);
      assertEquals(sub2.isDisposed, false);
      assertEquals(sub3.isDisposed, false);
    });

    it('should unsubscribe from observable', () => {
      trackerOrg1.unsubscribe();

      assertEquals(sub1!.isDisposed, false);
      assertEquals(sub2!.isDisposed, false);
      assertEquals(sub3!.isDisposed, false);

      reporter.reportLocation({ lat: 37.7749, lon: 122.4194 });

      assertEquals(trackerOrg1.locations.length, 0);
      assertEquals(trackerOrg2.locations.length, 1);
      assertEquals(trackerOrg3.locations.length, 1);

      trackerOrg2.unsubscribe();

      assertEquals(sub1!.isDisposed, false);
      assertEquals(sub2!.isDisposed, false);
      assertEquals(sub3!.isDisposed, false);

      reporter.reportLocation({ lat: 37.7749, lon: 122.4194 });

      assertEquals(trackerOrg1.locations.length, 0);
      assertEquals(trackerOrg2.locations.length, 1);
      assertEquals(trackerOrg3.locations.length, 2);

      trackerOrg3.complete();

      assertEquals(sub1!.isDisposed, true);
      assertEquals(sub2!.isDisposed, true);
      assertEquals(sub3!.isDisposed, true);

      reporter.reportLocation({ lat: 37.7749, lon: 122.4194 });

      assertEquals(trackerOrg1.locations.length, 0);
      assertEquals(trackerOrg2.locations.length, 1);
      assertEquals(trackerOrg3.locations.length, 2);
    });
  });
});
