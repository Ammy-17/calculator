import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CalculatorService } from '../../services/calculator-service';
import { HttpErrorResponse } from '@angular/common/http';
import { IOperationModel } from '../../models/operation-model';
import { OperationEnum } from '../helpers/operation-enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule
  ],
})
export class HomeComponent implements OnInit {

  private _operation: IOperationModel = {
    num1: 0,
    num2: 0
  }
  private _currentOperation = OperationEnum.None;
  public form: FormGroup | null = null;
  public isInOperation: boolean = false;

  constructor(
    private readonly _builder: FormBuilder,
    private readonly _calculatorService: CalculatorService
  ) { }

  ngOnInit() {
    this.form = this._buildForm();
  }

  public operate(htmlInput: HTMLInputElement): void {
    if (this._currentOperation === OperationEnum.None)
      return;
    this._operation.num2 = Number.parseFloat(htmlInput.value);
    if (this._currentOperation === OperationEnum.Sum)
      this.sumSubscription(htmlInput);
    this.isInOperation = false;
    this._currentOperation = OperationEnum.None;
  }

  private sumSubscription(htmlInput: HTMLInputElement): Subscription {
    return this._calculatorService.sum(this._operation)
    .subscribe({
      next: (response) => {
        if (response.isSuccess) {
          htmlInput.value = response.value.toString();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      },
      complete: () => {
        console.log("Solicitud finalizada.");
      }
    });
  }

  /**
   * Agrega el primer número para la operación.
   * @param htmlInput Input HTML a obtener y resetear el número.
   */
  public addFirstNumbber(htmlInput: HTMLInputElement, operation: OperationEnum): void {
    this._operation.num1 = Number.parseFloat(htmlInput.value);
    htmlInput.value = "";
    this.isInOperation = true;
    this._currentOperation = operation;
  }

  /**
   * Agrega un numero al valor de un elemento HTML (input).
   * @param num numero a concatenar.
   * @param htmlInput elemento HTML al que se agregarà el nùmero.
   */
  public addNumberToInput(num: number, htmlInput: HTMLInputElement): void {
    htmlInput.value = `${htmlInput.value}${num}`
  }

  /**
   * Elimina el ultimo caracter de derecha a izquierda del Imput 
   * @param htmlInput Imput al que se eliminara el caracter
   */
  public removeLast (htmlInput: HTMLInputElement): void {
    const text: string = htmlInput.value.toString();
    htmlInput.value = htmlInput.value.substring(0, text.length - 1)
  }

  /**
   * Crea el formulario y lo retorna.
   * @returns Formulario de la calculadora.
   */
  private _buildForm(): FormGroup {
    return this._builder.group({
      toSend: ["", [Validators.required]]
    });
  }
}
