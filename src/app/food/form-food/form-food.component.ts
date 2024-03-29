import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';
import { MatDividerModule } from '@angular/material/divider';
import { log } from 'console';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-form-food',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon, MatButtonModule, MatDividerModule,RouterModule],
  templateUrl: './form-food.component.html',
  styleUrl: './form-food.component.scss'
})

export class FormFoodComponent implements OnInit {


  form = this.formBuilder.group({

    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    image: ['', Validators.required],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0.1)]]

  })

  constructor(
    private formBuilder: FormBuilder,
    public serviceFood: FoodService,
    public router:Router
    ){}

  route: ActivatedRoute = inject(ActivatedRoute);
  foodId: number = -1;
  edit: boolean = false;
  food?: Food = {
    id: 0,
    name: '',
    description: '',
    category: '',
    image: '',
    price: 0
  }
  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.edit = true;
      this.foodId = Number(this.route.snapshot.params['id']);
      console.log(this.foodId);
      this.food = this.serviceFood.getOne(this.foodId);
      console.log(this.food);
      if (this.food) {
        this.name?.setValue(this.food?.name);
        this.form.patchValue({
          name: this.food.name,
          category: this.food.category,
          description: this.food.description,
          image: this.food.image,
          price: this.food.price.toString(),
        })
      }

    }


  }
  public updateData() {
    console.log('Actualizar comida');
    if (this.form.status == 'VALID') {
      // Validando cada dato
      if (this.name?.value && this.description?.value && this.category?.value && this.image?.value && this.price?.value) {
        let price = parseInt(this.price.value);
        let comida: Food = {
          // creando objeto
          id: this.foodId,
          name: this.name?.value,
          description: this.description?.value,
          category: this.category?.value,
          image: this.image?.value,
          price: price


        };
        this.serviceFood.updateFood(comida);
        this.router.navigate(['/food/food-list'])
      }
    }

  }

  public sendData() {
    // validando formulario
    if (this.form.status == 'VALID') {
      // Validando cada dato
      if (this.name?.value && this.description?.value && this.category?.value && this.image?.value && this.price?.value) {
        let price = parseInt(this.price.value);
        let comida: Food = {
          // creando objeto
          name: this.name?.value,
          description: this.description?.value,
          category: this.category?.value,
          image: this.image?.value,
          price: price


        };
        // Imprimeindo
        this.serviceFood.addFood(comida);
        this.router.navigate(['/food/food-list'])
      }
    }
  }


  get name() {
    return this.form.get('name')
  }
  get description() {
    return this.form.get('description')
  }
  get image() {
    return this.form.get('image')
  }
  get category() {
    return this.form.get('category')
  }
  get price() {
    return this.form.get('price')
  }




}