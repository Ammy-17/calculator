import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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

  public form: FormGroup | null = null;
  public n: any = [];

  constructor(private readonly _builder: FormBuilder) { }

  ngOnInit() {
    this.form = this._buildForm();
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
