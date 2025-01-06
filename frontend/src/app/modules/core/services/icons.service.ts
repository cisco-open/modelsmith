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

import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class IconsService {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
	) {}

	/**
	 * Registers a single SVG icon.
	 * @param iconName The name to reference the icon.
	 * @param iconPath The relative path to the SVG file.
	 */
	registerIcon(iconName: string, iconPath: string): void {
		console.log(iconName, iconPath);
		this.matIconRegistry.addSvgIcon(iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
	}

	/**
	 * Registers multiple SVG icons from a specified directory.
	 * @param iconNames Array of icon names.
	 * @param directoryPath The directory where icons are stored.
	 */
	registerIcons(iconNames: string[], directoryPath: string): void {
		iconNames.forEach((iconName) => {
			const fullPath = `${directoryPath}/${iconName}.svg`;
			this.registerIcon(iconName, fullPath);
		});
	}

	registerAllCustomIcons(): void {
		this.registerIcons(['machine-learning'], 'assets/icons');
	}

	initializeIcons(): void {
		this.registerAllCustomIcons();
	}
}
