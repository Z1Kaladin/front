import { Routes } from '@angular/router';
import { FoodListComponent } from './food/food-list/food-list.component';

export const routes: Routes = [
    { path: 'food', loadChildren: ()=>import('./food/foods.routes') },
];
