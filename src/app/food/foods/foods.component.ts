import { Component, Input, OnInit, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Food } from '../shared/food.model';
import { TitleCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FoodService } from '../shared/food.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogConfirmComponent  } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, TitleCasePipe, CurrencyPipe,  MatDialogModule,RouterModule],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.scss'
})
export class FoodsComponent {
  @Input() food?: Food;
  constructor(public serviceFood: FoodService, public dialog:MatDialog) {

  }


    openDialog(deleteFood:Food) {
      const dialogRef = this.dialog.open(DialogConfirmComponent,{
        data:deleteFood
      });




      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result == true){
          this.serviceFood.deleteFood(deleteFood);
        } 
      });
    }
}
