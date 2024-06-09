/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 *
 * The `@kz/core/dispose` module provides types and features for using and
 * disposing of managed resources.
 *
 * The dispose pattern allows developers to create classes associated with
 * resources that need to be released when they are no longer needed.
 *
 * ```ts
 * import { AbstractDisposable, usingAsync } from './mod.ts';
 *
 * class SwapiClient extends AbstractDisposable {
 *   protected cache = new Map<string, string>();
 *   constructor(protected baseUrl: string = 'https://swapi.dev/api') {
 *     super();
 *   }
 *   public dispose(): void {
 *     this.cache.clear();
 *   }
 *   protected async request(slug: string, id?: number): Promise<string> {
 *     const { cache, baseUrl } = this;
 *     const uri = id ? `${baseUrl}/${slug}/${id}` : `${baseUrl}/${slug}`;
 *     const cached = cache.get(uri);
 *
 *     if (cached) return cached;
 *
 *     const response = await fetch(uri);
 *     const data = await response.text();
 *
 *     cache.set(uri, data);
 *
 *     return data;
 *   }
 *   public async getPeople(id?: number): Promise<string> {
 *     return await this.request('people', id);
 *   }
 * }
 *
 * usingAsync(new SwapiClient(), async (client) => {
 *   const people = await client.getPeople(1);
 *
 *   console.log(people);
 * });
 * ```
 *
 * @module dispose
 */

export * from './exceptions/mod.ts';
export * from './types/mod.ts';
export { AbstractDisposable } from './abstract_disposable.ts';
export { assertNotDisposed } from './assert_not_disposed.ts';
export { DisposablePool } from './disposable_pool.ts';
export { dispose } from './dispose.ts';
export { using, usingAsync } from './using.ts';
