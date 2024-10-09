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

import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileService } from '../../../core/services/file.service';
import { BannerService } from '../ms-banner/services/banner.service';

@Component({
	selector: 'ms-file-upload',
	templateUrl: './ms-file-upload.component.html',
	styleUrls: ['./ms-file-upload.component.scss'],
	standalone: true,
	imports: [MatIconModule]
})
export class MsFileUploadComponent {
	uploadedFileName: string | null = null;

	@ViewChild('dropzone', { static: false }) dropzone!: ElementRef;
	@ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

	constructor(
		private snackbarService: BannerService,
		private fileService: FileService
	) {}

	onFileDrop(event: DragEvent) {
		event.preventDefault();
		this.dropzone.nativeElement.classList.remove('dragover');
		if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
			const file = event.dataTransfer.files[0];
			this.validateAndUpload(file);
		}
	}

	onDragOver(event: DragEvent) {
		event.preventDefault();
		this.dropzone.nativeElement.classList.add('dragover');
	}

	onDragLeave(event: DragEvent) {
		event.preventDefault();
		this.dropzone.nativeElement.classList.remove('dragover');
	}

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length) {
			const file = input.files[0];
			this.validateAndUpload(file);
		}
		input.value = '';
	}

	private validateAndUpload(file: File) {
		const allowedTypes = [
			'text/python',
			'text/plain',
			'text/x-python',
			'application/x-python-code',
			'text/x-python-script'
		];
		const maxSize = 5 * 1024 * 1024;

		if (allowedTypes.includes(file.type) && file.size <= maxSize) {
			this.handleFileSelection(file);
		} else if (file.size > maxSize) {
			this.snackbarService.showError('File size exceeds the allowed limit');
		} else {
			this.snackbarService.showError('Unsupported file type');
		}
	}

	private handleFileSelection(file: File) {
		const formData = new FormData();
		formData.append('file', file, file.name);

		this.uploadedFileName = file.name;
		this.fileService.file = file;
	}

	removeFile() {
		this.uploadedFileName = null;
		this.fileService.clearFile();
	}
}
