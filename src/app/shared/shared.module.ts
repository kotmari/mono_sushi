import { NgModule } from "@angular/core";

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


const MATERIAL = [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule 
];

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL
    ],
    exports: [
        ...MATERIAL
    ]
})
export class SharedModule {}