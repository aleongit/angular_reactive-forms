import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

export interface IFormError {
  control: string;
  error: string;
  value: any;
}

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class ProfileEditorComponent {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: ['', Validators.required],
      state: [''],
      zip: [''],
    }),
    aliases: this.fb.array([this.fb.control('')]),
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  /* test */
  showObjectObject() {
    console.log(this.profileForm);
  }


 //recursiva pels FormGroup dins FormGroup
  getFormValidationErrors(form: FormGroup) {
    const result: IFormError[] = [];
    Object.keys(form.controls).forEach(key => {
      const formProperty = form.get(key);
      if (formProperty instanceof FormGroup) {
        result.push(...this.getFormValidationErrors(formProperty))
      }
      const controlErrors: ValidationErrors | null = formProperty!.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });
    console.log(result);
    return result;
  }





}
