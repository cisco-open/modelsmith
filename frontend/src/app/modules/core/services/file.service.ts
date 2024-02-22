import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileActions } from '../../../state/core/file/file.actions';
import { BannerService } from './banner.service';
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
