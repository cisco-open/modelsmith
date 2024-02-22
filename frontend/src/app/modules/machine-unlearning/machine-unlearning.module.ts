import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MachineUnlearningComponent } from './components/machine-unlearning/machine-unlearning.component';
import { MachineUnlearningRoutingModule } from './machine-unlearning-routing.module';

@NgModule({
	declarations: [MachineUnlearningComponent],
	imports: [CommonModule, SharedModule, MachineUnlearningRoutingModule],
	providers: []
})
export class MachineUnlearningModule {}
