//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StorageKeys } from '../modules/shared/storage/storage.constants';

/**
 * `localStorageSyncReducer` is a meta-reducer for synchronizing specific parts of the state
 * to local storage. This ensures persistence of the state across browser sessions.
 *
 * It uses `localStorageSync` from `ngrx-store-localstorage` to synchronize the state based on
 * the defined keys. In this configuration, it's set to synchronize the authentication state
 * (specified by `StorageKeys.AUTH.ROOT`) within the core state (specified by `StorageKeys.CORE`).
 *
 * @param {ActionReducer<any>} reducer - The original reducer that processes the action.
 *
 * @returns {ActionReducer<any>} - A new reducer that wraps the original one and adds
 *                                 the local storage synchronization functionality.
 */
function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	const syncKeys = [
		{ [StorageKeys.CORE.ROOT]: [StorageKeys.AUTH.ROOT, StorageKeys.CONFIGS.ROOT, StorageKeys.SCRIPT.ROOT] }
	];

	const localStorageSyncConfig = {
		keys: syncKeys,
		rehydrate: true
	};

	return localStorageSync(localStorageSyncConfig)(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
