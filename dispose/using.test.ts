/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the using and usingAsync functions.
 */

import { describe, it } from '@std/testing/bdd';
import { assert } from '@std/assert';

import { type IDisposable, using, usingAsync } from './mod.ts';

class Basic implements IDisposable {
  constructor(public name: string) {}

  isDisposed = false;

  dispose(): void {
    this.isDisposed = true;
  }
}

class Async implements IDisposable {
  constructor(public name: string) {}

  isDisposed = false;

  async run(): Promise<void> {
    await new Promise(function (resolve): void {
      setTimeout(resolve, 1000);
    });
  }

  dispose(): void {
    this.isDisposed = true;
  }
}

describe('using', () => {
  describe('using(disposable, callback', () => {
    const disposable = new Basic('A');

    it('should dispose after callback', () => {
      using(disposable, (d) => {
        assert(!d.isDisposed);
        assert(d.name === 'A');
      });

      assert(disposable.isDisposed);
    });
  });

  describe('usingAsync(disposable, callback)', () => {
    const disposable = new Async('A');

    it('should dispose after callback', async () => {
      await usingAsync(disposable, async (d) => {
        assert(!d.isDisposed);
        await d.run();
        assert(d.name === 'A');
      });

      assert(disposable.isDisposed);
    });
  });
});
