import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckautComponent } from './checkaut.component';



const routes: Routes = [
  { path: '', component: CheckautComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckautRoutingModule { }
