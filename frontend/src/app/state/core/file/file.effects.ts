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

import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CLIENT } from '../../../app.tokens';
import { BannerService } from '../../../modules/shared/standalone/ms-banner/services/banner.service';
import { Client } from '../../../services/client/client';
import { PostUploadModel } from '../../../services/client/serviceCalls/upload-file/post-upload-file';
import { ScriptActions } from '../script/script.actions';
import { FileActions } from './file.actions';

@Injectable()
export class FileEffects {
	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private bannerService: BannerService,
		private actions$: Actions
	) {}

	uploadFile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FileActions.uploadFile),
			switchMap((action) => {
				return this.apiClient.serviceCall(new PostUploadModel(action.file)).pipe(
					map((data) => FileActions.uploadFileSuccess({ data })),
					catchError((error) => of(FileActions.uploadFileFailure({ error })))
				);
			})
		)
	);

	uploadFileAndCallScript$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FileActions.uploadFileAndCallScript),
			switchMap((action) => {
				this.bannerService.showInfo('Uploading file');
				return this.apiClient.serviceCall(new PostUploadModel(action.file)).pipe(
					switchMap((data) => {
						this.bannerService.showSuccess('File uploaded successfully.');
						return [FileActions.uploadFileSuccess({ data }), ScriptActions.callScript({ configs: action.configs })];
					}),
					catchError((error) => of(FileActions.uploadFileFailure({ error })))
				);
			})
		)
	);
}
