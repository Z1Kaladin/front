import { Route } from "@angular/router";
import { FoodListComponent } from "./food-list/food-list.component";
import { HomeComponent } from "../home/home.component";
import path from "node:path";
import { Component } from "@angular/core";
import { FormFoodComponent } from "./form-food/form-food.component";
import { DetailsFoodComponent } from "./details-food/details-food.component";
 
export default [
    {
        path:'home',
        component: HomeComponent
    },
 
    {
        path: 'food-list',
        component: FoodListComponent,
        title:'Lista de comida'
    },
    {
        path: 'form-food',
        component: FormFoodComponent,
        title:'Crear comida'
    },
    {
        path: 'details-food/:id',
        component:DetailsFoodComponent, 
        title:'Detalles'
    },
    {
    path:'form/:id',
    component:FormFoodComponent,
    title: 'Actualizar comida'
    }

] satisfies Route[];  