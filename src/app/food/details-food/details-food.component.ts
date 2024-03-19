import { Component, Input, OnInit, inject, input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent  } from '../../shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-details-food',
  standalone: true,
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './details-food.component.html',
  styleUrl: './details-food.component.scss'
})
export class DetailsFoodComponent implements OnInit {
  @Input() food?: Food;

  constructor(private activeRoute:ActivatedRoute, public serviceFood:FoodService, public dialog:MatDialog ){
    

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

  route:ActivatedRoute = inject(ActivatedRoute);


  foodId:number = -1;
  foods:Food = {
    id:0,
    name:'',
    description:'',
    category:'',
    image:'',
    price:0
  } 
  ngOnInit(): void {

    this.foodId =Number (this.route.snapshot.params['id']);
    console.log(this.foodId);
    this.food = this.serviceFood.getOne(this.foodId);
    console.log(this.food);

    

  }


} 

