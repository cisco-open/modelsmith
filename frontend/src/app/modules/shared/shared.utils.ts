//    Copyright 2024 Cisco Systems, Inc. and its affiliates

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

export const generateRandomID = (): number => {
	return Math.floor(Math.random() * 1000000);
};

export function isEmptyObject(obj: any): boolean {
	return (
		(obj === undefined || Object.prototype.toString.call(obj) === '[object Object]') &&
		Object.keys(obj || {}).length === 0
	);
}

export function isNil(obj: any): boolean {
	return obj === null || obj === undefined;
}

export function isNilOrEmptyString(obj: any): boolean {
	return obj === null || obj === undefined || obj === '';
}

export function isEmptyArray(obj: any): boolean {
	return Array.isArray(obj) && obj.length === 0;
}

export const toTitleCase = (str: string) =>
	str
		.toLowerCase()
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

export const disableBackgroundScroll = (): void => document.body.classList.add('cdk-global-scrollblock');

export const enableBackgroundScroll = (): void => document.body.classList.remove('cdk-global-scrollblock');
