/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Fiber} from './ReactInternalTypes';

import {getStackByFiberInDevAndProd} from './ReactFiberComponentStack';
import hasOwnProperty from 'shared/hasOwnProperty';

export type CapturedValue<T> = {
  value: T,
  source: Fiber | null,
  stack: string | null,
  digest: string | null,
};

export function createCapturedValueAtFiber<T>(
  value: T,
  source: Fiber,
): CapturedValue<T> {
  if (!hasOwnProperty.call(value, '_componentStack')) {
    (value: any)._componentStack = getStackByFiberInDevAndProd(source);
  }
  // If the value is an error, call this function immediately after it is thrown
  // so the stack is accurate.
  return {
    value,
    source,
    stack: (value: any)._componentStack,
    digest: null,
  };
}

export function createCapturedValue<T>(
  value: T,
  digest: ?string,
  stack: ?string,
): CapturedValue<T> {
  if (!hasOwnProperty.call(value, '_componentStack')) {
    (value: any)._componentStack = stack;
  }
  return {
    value,
    source: null,
    stack: stack != null ? stack : null,
    digest: digest != null ? digest : null,
  };
}
