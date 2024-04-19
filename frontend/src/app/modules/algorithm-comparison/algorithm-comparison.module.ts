import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlgorithmComparisonRoutingModule } from './algorithm-comparison-routing.module';
import { AlgorithmComparisonComponent } from './components/algorithm-comparison/algorithm-comparison.component';

@NgModule({
	declarations: [AlgorithmComparisonComponent],
	imports: [CommonModule, AlgorithmComparisonRoutingModule]
})
export class AlgorithmComparisonModule {}
