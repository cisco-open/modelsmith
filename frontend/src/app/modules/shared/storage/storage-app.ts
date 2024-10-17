//   Copyright 2024 Cisco Systems, Inc.

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

export class StorageApp {
	/**
	 * Store a value in the local storage.
	 *
	 * @param {string} key - The key under which the value will be stored.
	 * @param {any} value - The value to be stored, which will be stringified to JSON format.
	 */
	public static setItem(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * Retrieve a value from local storage and parse it from JSON format.
	 *
	 * @param {string} key - The key under which the value is stored.
	 * @returns {T | null} - The parsed value or null if the key does not exist.
	 */
	public static getItem<T>(key: string): T | null {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	}

	/**
	 * Retrieve a nested property from an object stored in local storage.
	 *
	 * @param {string} key - The key under which the object is stored.
	 * @param {string} path - The dot-separated path to the nested property.
	 * @returns {T | null} - The nested property value or null if the path is invalid.
	 */
	public static getNestedItem<T>(key: string, path: string): T | null {
		const data = this.getItem<any>(key);
		if (data) {
			return this.getNestedProperty(data, path);
		}
		return null;
	}

	/**
	 * Remove an item from local storage.
	 *
	 * @param {string} key - The key under which the item is stored.
	 */
	public static removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	/**
	 * Clear all items from local storage.
	 */
	public static clear(): void {
		localStorage.clear();
	}

	/**
	 * Retrieve a nested property from an object based on a dot-separated path.
	 *
	 * @private
	 * @param {any} obj - The object from which the property should be retrieved.
	 * @param {string} path - The dot-separated path to the nested property.
	 * @returns {any} - The value at the specified path or undefined if the path is invalid.
	 */
	private static getNestedProperty(obj: any, path: string): any {
		if (!path) return obj;
		const properties = path.split('.');
		for (let i = 0; i < properties.length; i++) {
			if (!obj) return undefined;
			obj = obj[properties[i]];
		}

		return obj;
	}
}
