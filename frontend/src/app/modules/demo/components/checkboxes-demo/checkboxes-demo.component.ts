import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
	name: string;
	completed: boolean;
	color: ThemePalette;
	subtasks?: Task[];
}

@Component({
	selector: 'ms-checkboxes-demo',
	templateUrl: './checkboxes-demo.component.html',
	styleUrls: ['./checkboxes-demo.component.scss']
})
export class CheckboxesDemoComponent implements OnInit {
	task: Task = {
		name: 'Indeterminate',
		completed: false,
		color: 'primary',
		subtasks: [
			{ name: 'Primary', completed: false, color: 'primary' },
			{ name: 'Accent', completed: false, color: 'accent' },
			{ name: 'Warn', completed: false, color: 'warn' }
		]
	};

	allComplete: boolean = false;

	updateAllComplete() {
		this.allComplete = this.task.subtasks != null && this.task.subtasks.every((t) => t.completed);
	}

	someComplete(): boolean {
		if (this.task.subtasks == null) {
			return false;
		}
		return this.task.subtasks.filter((t) => t.completed).length > 0 && !this.allComplete;
	}

	setAll(completed: boolean) {
		this.allComplete = completed;
		if (this.task.subtasks == null) {
			return;
		}
		this.task.subtasks.forEach((t) => (t.completed = completed));
	}

	constructor() {}

	ngOnInit(): void {}
}
