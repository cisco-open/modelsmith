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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileActions } from '../../../state/core/file/file.actions';
import { BannerService } from '../../shared/components/ms-banner/services/banner.service';
import { FileFacadeService } from './file-facade.service';

@Injectable()
export class FileService {
	private _fileSubject: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

	constructor(
		private bannerService: BannerService,
		private fileFacadeService: FileFacadeService
	) {}

	get isFileLoaded(): boolean {
		return !!this._fileSubject.value;
	}

	get file$(): Observable<File | null> {
		return this._fileSubject.asObservable();
	}

	set file(file: File | null) {
		this._fileSubject.next(file);
	}

	get file(): File | null {
		return this._fileSubject.value;
	}

	clearFile() {
		this._fileSubject.next(null);
	}

	uploadFile() {
		if (!this.file) {
			this.bannerService.showError('No file to upload.');
			return;
		}

		this.fileFacadeService.dispatch(FileActions.uploadFile({ file: this.file }));
	}
}
