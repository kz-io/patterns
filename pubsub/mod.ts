/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 *
 * The `@kz/patterns/pubsub` module provides types and features for
 * implementing the publisher/subscriber pattern.
 *
 * Within integereleven the publisher/subscriber pattern is a software design
 * pattern similar to the observer pattern, but with a key difference: topics.
 * In the publisher/subscriber pattern, the publisher sends messages to
 * subscribers based on topics. This allows for more granular control over
 * which messages are sent to which subscribers.
 *
 * ```ts
 * import {
 *   type PubSubTopicMessage,
 *   TAbstractSubscriber,
 *   TBasePublisher,
 * } from './mod.ts';
 *
 * import { TAbstractObserver } from '../observer/mod.ts';
 *
 * interface TChange<T> {
 *   model: string;
 *   user: string;
 *   value: T;
 * }
 *
 * interface IUser {
 *   id: string;
 *   name: string;
 * }
 *
 * interface IDevice {
 *   id: string;
 *   name: string;
 *   type: string;
 * }
 *
 * type ChangeMap = {
 *   'user': TChange<IUser>;
 *   'device': TChange<IDevice>;
 * };
 *
 * class Updater extends TBasePublisher<ChangeMap> {
 * }
 *
 * class UserUpdater extends TAbstractSubscriber<ChangeMap, 'user'> {
 *   public next(change: PubSubTopicMessage<ChangeMap, 'user'>): void {
 *     const [, message] = change;
 *
 *     console.log(
 *       `User ${message.user} updated ${message.model} to ${message.value.name}`,
 *     );
 *   }
 *
 *   public error(error: Error): void {
 *     console.error(error);
 *   }
 * }
 *
 * class DeviceUpdater extends TAbstractSubscriber<ChangeMap, 'device'> {
 *   public next(change: PubSubTopicMessage<ChangeMap, 'device'>): void {
 *     const [, message] = change;
 *
 *     console.log(
 *       `User ${message.user} updated ${message.model} to ${message.value.name}`,
 *     );
 *   }
 *
 *   public error(error: Error): void {
 *     console.error(error);
 *   }
 * }
 *
 * // Yes! You can use regular observers to subscribe to a publisher.
 * // Because they cannot specify a topic, they will receive all messages from
 * // the publisher.
 * class Logger extends TAbstractObserver<PubSubTopicMessage<ChangeMap>> {
 *   public next(change: PubSubTopicMessage<ChangeMap>): void {
 *     const [topic, message] = change;
 *
 *     console.log(`${topic}: Changed by ${message.user}`);
 *   }
 *
 *   public error(error: Error): void {
 *     console.error(error);
 *   }
 * }
 *
 * const updater = new Updater();
 * const userUpdater = new UserUpdater(['user']);
 * const deviceUpdater = new DeviceUpdater(['device']);
 * const logger = new Logger();
 *
 * updater.subscribe(userUpdater);
 * updater.subscribe(deviceUpdater);
 * updater.subscribe(logger);
 *
 * updater.publish(['user', {
 *   model: 'user',
 *   user: 'admin',
 *   value: { id: '1', name: 'admin' },
 * }]);
 *
 * updater.publish(['device', {
 *   model: 'device',
 *   user: 'admin',
 *   value: { id: '1', name: 'MKSENSE', type: 'sensor' },
 * }]);
 * ```
 * @module pubsub
 */

export * from './types/mod.ts';
export { TAbstractSubscriber } from './t_abstract_subscriber.ts';
export { TBasePublisher } from './t_base_publisher.ts';
