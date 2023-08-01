
## Overview of reactive forms

- Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around **observable** streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

- Reactive forms also provide a straightforward path to testing because you are assured that your data is consistent and predictable when requested. Any consumers of the streams have access to manipulate that data safely.

- Reactive forms differ from *template-driven forms* in distinct ways. Reactive forms provide synchronous access to the data model, immutability with observable operators, and change tracking through observable streams.

- *Template-driven forms* let direct access modify data in your template, but are less explicit than reactive forms because they rely on directives embedded in the template, along with mutable data to track changes asynchronously. See the Forms Overview for detailed comparisons between the two paradigms.



## Adding a basic form control

- There are three steps to using form controls.

1. Register the reactive forms module in your application. This module declares the reactive-form directives that you need to use reactive forms.
2. Generate a new component and instantiate a new `FormControl`.
3. Register the `FormControl` in the template.

- You can then display the form by adding the component to the template.

The following examples show how to add a single form control. In the example, the user enters their name into an input field, captures that input value, and displays the current value of the form control element.



#### Register the reactive forms module

- To use reactive form controls, import `ReactiveFormsModule` from the `@angular/forms` package and add it to your NgModule's `imports` array.

- **src/app/app.module.ts**
```ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }
```


#### Generate a new *FormControl*

- Use the **CLI command** `ng generate` to generate a component in your project to host the control.

- **src/app/name-editor/name-editor.component.ts**
```ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
}
```

- Use the constructor of `FormControl` to set its initial value, which in this case is an empty string. By creating these controls in your component class, you get immediate access to listen for, update, and validate the state of the form input.



#### Register the control in the template

- After you create the control in the component class, you must associate it with a form control element in the template. Update the template with the form control using the `formControl` binding provided by `FormControlDirective`, which is also included in the `ReactiveFormsModule`.

- **src/app/name-editor/name-editor.component.html**
```html
<label for="name">Name: </label>
<input id="name" type="text" [formControl]="name">
```

- Using the template binding syntax, the form control is now registered to the `name` input element in the template. The form control and DOM element communicate with each other: the view reflects changes in the model, and the model reflects changes in the view.



#### Display the component

- The `FormControl` assigned to the name property is displayed when the property's host component is added to a template.

- **src/app/app.component.html**
```html
<app-name-editor></app-name-editor>
```




### Displaying a form control value

- You can display the value in the following ways.

    - Through the `valueChanges` observable where you can listen for changes in the form's value in the template using `AsyncPipe` or in the component class using the `subscribe()` method
    
    - With the `value` property, which gives you a snapshot of the current value

- The following example shows you how to display the current value using interpolation in the template.

- **src/app/name-editor/name-editor.component.html**
```html
<p>Value: {{ name.value }}</p>
```

- The displayed value changes as you update the form control element.

- Reactive forms provide access to information about a given control through properties and methods provided with each instance. These properties and methods of the underlying **AbstractControl** class are used to control form state and determine when to display messages when handling **input validation**.

Read about other *FormControl* properties and methods in the *API Reference*.



### Replacing a form control value

- Reactive forms have methods to change a control's value programmatically, which gives you the flexibility to update the value without user interaction. A form control instance provides a `setValue()` method that updates the value of the form control and validates the structure of the value provided against the control's structure. For example, when retrieving form data from a backend API or service, use the `setValue()` method to update the control to its new value, replacing the old value entirely.

The following example adds a method to the component class to update the value of the control to *Nancy* using the setValue() method.

- **src/app/name-editor/name-editor.component.ts**
```ts
updateName() {
  this.name.setValue('Nancy');
}
```

- Update the template with a button to simulate a name update. When you click the **Update Name** button, the value entered in the form control element is reflected as its current value.

- **src/app/name-editor/name-editor.component.html**
```html
<button type="button" (click)="updateName()">Update Name</button>
```

- The form model is the source of truth for the control, so when you click the button, the value of the input is changed within the component class, overriding its current value.

- In this example, you're using a single control. When using the `setValue()` method with a **form group** or **form array** instance, the value needs to match the structure of the group or array.



## Grouping form controls

- Forms typically contain several related controls. Reactive forms provide two ways of grouping multiple related controls into a single input form.

| FORM GROUPS   |	DETAILS
| :----------   | -------
| `Form group`  | Defines a form with a fixed set of controls that you can manage together. Form group basics are discussed in this section. You can also nest form groups to create more complex forms.
| `Form array`  | Defines a dynamic form, where you can add and remove controls at run time. You can also nest form arrays to create more complex forms. For more about this option, see **Creating dynamic forms**.

- Just as a form control instance gives you control over a single input field, a form group instance tracks the form state of a group of form control instances (for example, a form). Each control in a form group instance is tracked by name when creating the form group. The following example shows how to manage multiple form control instances in a single group.

- Generate a `ProfileEditor` component and import the `FormGroup` and `FormControl` classes from the `@angular/forms` package.

```
ng generate component ProfileEditor
```
- **src/app/profile-editor/profile-editor.component.ts**
```ts
import { FormGroup, FormControl } from '@angular/forms';
```

- To add a form group to this component, take the following steps.

1. Create a `FormGroup` instance.
2. Associate the `FormGroup` model and view.
3. Save the form data.


#### Create a *FormGroup* instance

- Create a property in the component class named `profileForm` and set the property to a new form group instance. To initialize the form group, provide the constructor with an object of named keys mapped to their control. For the profile form, add two form control instances with the names `firstName` and `lastName`.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
}
```

- The individual form controls are now collected within a group. A `FormGroup` instance provides its model value as an object reduced from the values of each control in the group. A form group instance has the same properties (such as `value` and `untouched`) and methods (such as `setValue()`) as a form control instance.



#### Associate the *FormGroup* model and view

- A form group tracks the status and changes for each of its controls, so if one of the controls changes, the parent control also emits a new status or value change. The model for the group is maintained from its members. After you define the model, you must update the template to reflect the model in the view.

- **src/app/profile-editor/profile-editor.component.html**
```html
<form [formGroup]="profileForm">

  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName">

  <label for="last-name">Last Name: </label>
  <input id="last-name" type="text" formControlName="lastName">

</form>
```

- Just as a form group contains a group of controls, the *profileForm* `FormGroup` is bound to the `form` element with the `FormGroup` directive, creating a communication layer between the model and the form containing the inputs.

- The `formControlName` input provided by the `FormControlName` directive binds each individual input to the form control defined in `FormGroup`. The form controls communicate with their respective elements. They also communicate changes to the form group instance, which provides the source of truth for the model value



#### Save form data

- The `ProfileEditor` component accepts input from the user, but in a real scenario you want to capture the form value and make available for further processing outside the component. The `FormGroup` directive listens for the `submit` event emitted by the `form` element and emits an `ngSubmit` event that you can bind to a callback function. Add an `ngSubmit` event listener to the form tag with the `onSubmit()` callback method.

- **src/app/profile-editor/profile-editor.component.html**
```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
```

- The `onSubmit()` method in the `ProfileEditor` component captures the current value of `profileForm`. Use `EventEmitter` to keep the form encapsulated and to provide the form value outside the component. The following example uses `console.warn` to log a message to the browser console.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
```

- The `submit` event is emitted by the `form` tag using the built-in DOM event. You trigger the event by clicking a button with `submit` type. This lets the user press the **Enter** key to submit the completed form. 

- Use a `button` element to add a button to the bottom of the form to trigger the form submission.

- **src/app/profile-editor/profile-editor.component.html**
```html
<p>Complete the form to enable button.</p>
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```

- The button in the preceding snippet also has a `disabled` binding attached to it to disable the button when `profileForm` is invalid. You aren't performing any validation yet, so the button is always enabled. Basic form validation is covered in the **Validating form input** section.



#### Display the component

- To display the `ProfileEditor` component that contains the form, add it to a component template.

- **src/app/app.component.html**
```html
<app-profile-editor></app-profile-editor>
```



### Creating nested form groups

- Form groups can accept both individual form control instances and other form group instances as children. This makes composing complex form models easier to maintain and logically group together.

- When building complex forms, managing the different areas of information is easier in smaller sections. Using a nested form group instance lets you break large forms groups into smaller, more manageable ones.

- To make more complex forms, use the following steps.

1. Create a nested group.
2. Group the nested form in the template

- Some types of information naturally fall into the same group. A name and address are typical examples of such nested groups, and are used in the following examples.


#### Create a nested group

- To create a nested group in `profileForm`, add a nested `address` element to the form group instance.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
}
```

- In this example, `address group` combines the current `firstName` and `lastName` controls with the new `street`, `city`, `state`, and `zip` controls. Even though the `address` element in the form group is a child of the overall `profileForm` element in the form group, the same rules apply with value and status changes. Changes in status and value from the nested form group propagate to the parent form group, maintaining consistency with the overall model.



#### Group the nested form in the template

- After you update the model in the component class, update the template to connect the form group instance and its input elements. Add the `address` form group containing the `street`, `city`, `state`, and `zip` fields to the `ProfileEditor` template.

- **src/app/profile-editor/profile-editor.component.html**
```html
<div formGroupName="address">
  <h2>Address</h2>

  <label for="street">Street: </label>
  <input id="street" type="text" formControlName="street">

  <label for="city">City: </label>
  <input id="city" type="text" formControlName="city">

  <label for="state">State: </label>
  <input id="state" type="text" formControlName="state">

  <label for="zip">Zip Code: </label>
  <input id="zip" type="text" formControlName="zip">
</div>
```

- The `ProfileEditor` form is displayed as one group, but the model is broken down further to represent the logical grouping areas.

- Display the value for the form group instance in the component template using the value property and `JsonPipe`.



### Updating parts of the data model

- When updating the value for a form group instance that contains multiple controls, you might only want to update parts of the model. This section covers how to update specific parts of a form control data model.

- There are two ways to update the model value:

| METHODS           | DETAILS
| :--------         | :-------
| `setValue()`	    | Set a new value for an individual control. The `setValue()` method strictly adheres to the structure of the form group and replaces the entire value for the control.
| `patchValue()`    | Replace any properties defined in the object that have changed in the form model

- The strict checks of the `setValue()` method help catch nesting errors in complex forms, while `patchValue()` fails silently on those errors.

- In `ProfileEditorComponent`, use the `updateProfile` method with the following example to update the *first name* and *street address* for the user.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
updateProfile() {
  this.profileForm.patchValue({
    firstName: 'Nancy',
    address: {
      street: '123 Drew Street'
    }
  });
}
```

- Simulate an update by adding a button to the template to update the user profile on demand.

- **src/app/profile-editor/profile-editor.component.html**
```html
<button type="button" (click)="updateProfile()">Update Profile</button>
```

- When a user clicks the button, the `profileForm` model is updated with new values for `firstName` and `street`. Notice that `street` is provided in an object inside the `address` property. This is necessary because the `patchValue()` method applies the update against the model structure. `PatchValue()` only updates properties that the form model defines.



## Using the *FormBuilder* service to generate controls

- Creating form control instances manually can become repetitive when dealing with multiple forms. `The FormBuilder` service provides convenient methods for generating controls.

- Use the following steps to take advantage of this service.

1. Import the `FormBuilder` class.
2. Inject the `FormBuilder` service.
3. Generate the form contents.

- The following examples show how to refactor the `ProfileEditor` component to use the form builder service to create form control and form group instances




#### Import the *FormBuilder* class

- Import the `FormBuilder` class from the `@angular/forms` package.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
import { FormBuilder } from '@angular/forms';
```



#### Inject the *FormBuilder* service

- The `FormBuilder` service is an injectable provider that is provided with the reactive forms module. Inject this dependency by adding it to the component constructor.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
constructor(private fb: FormBuilder) { }
```



#### Generate form controls

- The `FormBuilder` service has three methods: `control()`, `group()`, and `array()`. These are factory methods for generating instances in your component classes including form controls, form groups, and form arrays. Use the group method to create the `profileForm` controls.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  constructor(private fb: FormBuilder) { }
}
```

- In the preceding example, you use the `group()` method with the same object to define the properties in the model. The value for each control name is an array containing the initial value as the first item in the array.

- You can define the control with just the initial value, but if your controls need sync or async validation, add sync and async validators as the second and third items in the array.



## Validating form input

- *Form validation* is used to ensure that user input is complete and correct. This section covers adding a single validator to a form control and displaying the overall form status. Form validation is covered more extensively in the [Form Validation](https://angular.io/guide/form-validation) guide.

- Use the following steps to add form validation.

1. Import a validator function in your form component.
2. Add the validator to the field in the form.
3. Add logic to handle the validation status.

- The most common validation is making a field required. The following example shows how to add a required validation to the `firstName` control and display the result of validation.



#### Import a validator function

- Reactive forms include a set of validator functions for common use cases. These functions receive a control to validate against and return an error object or a null value based on the validation check.

- Import the `Validators` class from the `@angular/forms` package.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
import { Validators } from '@angular/forms';
```



#### Make a field required

- In the `ProfileEditor` component, add the `Validators.required` static method as the second item in the array for the `firstName` control.

- **src/app/profile-editor/profile-editor.component.ts**
```ts
profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
});
```


#### Display form status

- When you add a required field to the form control, its initial status is invalid. This invalid status propagates to the parent form group element, making its status invalid. Access the current status of the form group instance through its `status` property.

- Display the current status of `profileForm` using interpolation.

- **src/app/profile-editor/profile-editor.component.html**
```html
<p>Form Status: {{ profileForm.status }}</p>
```

- The **Submit** button is disabled because `profileForm` is invalid due to the required `firstName` form control. After you fill out the `firstName` input, the form becomes valid and the **Submit** button is enabled.

- For more on form validation, visit the [Form Validation](https://angular.io/guide/form-validation) guide.




## Creating dynamic forms