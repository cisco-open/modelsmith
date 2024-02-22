import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModeSelectComponent } from './components/mode-select/mode-select.component';
import { ModeSelectRoutingModule } from './mode-select-routing.module';

@NgModule({
	declarations: [ModeSelectComponent],
	imports: [ModeSelectRoutingModule, SharedModule, CommonModule]
})
export class ModeSelectModule {}
