import { ServiceCallPOST } from '../service-call';

export class PostUploadModel extends ServiceCallPOST<any> {
	constructor(file: File | null) {
		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		super(`/upload-model`, formData, false);
	}
}
