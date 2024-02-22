import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
