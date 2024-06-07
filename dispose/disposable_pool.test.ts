/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the DisposablePool class.
 */

import { describe, it } from '@std/testing/bdd';
import { assert, assertEquals } from '@std/assert';

import { DisposablePool, type IDisposable } from './mod.ts';

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

describe('DisposablePool', () => {
  describe('(resources)', () => {
    it('should create a new instance with undisposed .resources', () => {
      const pool = new DisposablePool({
        a: new Basic('A'),
        b: new Basic('B'),
        c: new Basic('C'),
      });
      assert(!pool.isDisposed);
      assert(!pool.resources?.a.isDisposed);
      assert(!pool.resources?.b.isDisposed);
      assert(!pool.resources?.c.isDisposed);
    });
  });

  describe('use(callback)', () => {
    const pool = new DisposablePool({
      a: new Basic('A'),
      b: new Basic('B'),
      c: new Basic('C'),
    });

    it('pool and resource undisposed', () => {
      pool.use(({ a, b, c }, p) => {
        assert(!p.isDisposed);
        assert(!a.isDisposed);
        assert(!b.isDisposed);
        assert(!c.isDisposed);
      });
    });

    it('should dispose after callback', () => {
      assert(pool.isDisposed);
      assertEquals(pool.resources, undefined);
    });
  });

  describe('useAsync(callback)', () => {
    const pool = new DisposablePool({
      a: new Async('A'),
      b: new Async('B'),
      c: new Async('C'),
    });

    it('pool and resource undisposed', async () => {
      await pool.useAsync(async ({ a, b, c }, p) => {
        assert(!p.isDisposed);
        assert(!a.isDisposed);
        assert(!b.isDisposed);
        assert(!c.isDisposed);

        await a.run();
        await b.run();
        await c.run();
      });
    });

    it('should dispose after callback', () => {
      assert(pool.isDisposed);
    });
  });
});
