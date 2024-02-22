import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'ms-icons-demo',
	templateUrl: './icons-demo.component.html',
	styleUrls: ['./icons-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsDemoComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
