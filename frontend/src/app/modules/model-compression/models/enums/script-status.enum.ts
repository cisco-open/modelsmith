export enum ScriptStatusEnum {
	RUNNING = 'running',
	NOT_RUNNING = 'not_running',
	STOPPING = 'stopping',
	ERROR = 'error'
}

export function isScriptActive(state: ScriptStatusEnum | null): boolean {
	if (!state) {
		return false;
	}

	return state === ScriptStatusEnum.RUNNING || state === ScriptStatusEnum.STOPPING;
}
