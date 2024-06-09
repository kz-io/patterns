/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the features of the module.
 */

import { describe, it } from '@std/testing/bdd';
import { assertSpyCalls, spy } from '@std/testing/mock';

import {
  type PubSubTopicMessage,
  TAbstractSubscriber,
  TBasePublisher,
} from './mod.ts';

import { TAbstractObserver } from '../observer/mod.ts';

type PubSubTopics = {
  TopicA: string;
  TopicB: { value: number };
  TopicC: {
    timestamp: Date;
    details: {
      facility: string;
      severity: number;
      message: string;
    };
  };
};

class MySubscriber extends TAbstractSubscriber<PubSubTopics> {
  public next(message: PubSubTopicMessage<PubSubTopics>): void {
    console.log(message);
  }

  public error(error: Error): void {
    console.error(error);
  }
}

class MyTopicASubscriber extends TAbstractSubscriber<PubSubTopics, 'TopicA'> {
  public next(message: PubSubTopicMessage<PubSubTopics, 'TopicA'>): void {
    console.log(message);
  }

  public error(error: Error): void {
    console.error(error);
  }
}

class BasicObserver
  extends TAbstractObserver<PubSubTopicMessage<PubSubTopics, 'TopicA'>> {
  public next(value: PubSubTopicMessage<PubSubTopics, 'TopicA'>): void {
    console.log(value);
  }

  public error(error: Error): void {
    console.error(error);
  }
}

describe('pubsub', () => {
  describe('module test', () => {
    const publisher = new TBasePublisher<PubSubTopics>();
    const sub1 = new MySubscriber(['TopicA', 'TopicB', 'TopicC']);
    const sub2 = new MySubscriber(['TopicA', 'TopicB', 'TopicC']);
    const sub3 = new MySubscriber(['TopicA', 'TopicB', 'TopicC']);
    const sub4 = new MyTopicASubscriber(['TopicA']);
    const observer = new BasicObserver();

    const subscr1 = publisher.subscribe(sub1);
    const subscr2 = publisher.subscribe(sub2);
    const subscr3 = publisher.subscribe(sub3);
    const subscr4 = publisher.subscribe(sub4);
    const subscr5 = publisher.subscribe(observer);

    const messageA: PubSubTopicMessage<PubSubTopics> = [
      'TopicA',
      'Hello, world!',
    ];

    const messageB: PubSubTopicMessage<PubSubTopics> = ['TopicB', {
      value: 42,
    }];

    const messageC: PubSubTopicMessage<PubSubTopics> = ['TopicC', {
      timestamp: new Date(),
      details: {
        facility: 'syslog',
        severity: 1,
        message: 'Hello, world!',
      },
    }];

    it('should publish a message to all subscribers', () => {
      const spySubscriber1 = spy(sub1, 'next');
      const spySubscriber2 = spy(sub2, 'next');
      const spySubscriber3 = spy(sub3, 'next');
      const spySubscriber4 = spy(sub4, 'next');
      const spyObserver = spy(observer, 'next');

      publisher.publish(messageA);
      publisher.publish(messageB);
      publisher.publish(messageC);

      assertSpyCalls(spySubscriber1, 3);
      assertSpyCalls(spySubscriber2, 3);
      assertSpyCalls(spySubscriber3, 3);
      assertSpyCalls(spySubscriber4, 1);
      assertSpyCalls(spyObserver, 3); // listening to all as an observer

      spySubscriber1.restore();
      spySubscriber2.restore();
      spySubscriber3.restore();
      spySubscriber4.restore();
      spyObserver.restore();
    });

    it('should not publish a message to unsubscribed subscribers', () => {
      const spySubscriber1 = spy(sub1, 'next');
      const spySubscriber2 = spy(sub2, 'next');
      const spySubscriber3 = spy(sub3, 'next');
      const spySubscriber4 = spy(sub4, 'next');
      const spyObserver = spy(observer, 'next');

      subscr1.dispose();
      subscr2.dispose();
      subscr3.dispose();
      subscr4.dispose();
      subscr5.dispose();

      publisher.publish(messageA);
      publisher.publish(messageB);
      publisher.publish(messageC);

      assertSpyCalls(spySubscriber1, 0);
      assertSpyCalls(spySubscriber2, 0);
      assertSpyCalls(spySubscriber3, 0);
      assertSpyCalls(spySubscriber4, 0);
      assertSpyCalls(spyObserver, 0);

      spySubscriber1.restore();
      spySubscriber2.restore();
      spySubscriber3.restore();
      spySubscriber4.restore();
      spyObserver.restore();
    });
  });
});
