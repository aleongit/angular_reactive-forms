
## Overview of reactive forms

- Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around **observable** streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

- Reactive forms also provide a straightforward path to testing because you are assured that your data is consistent and predictable when requested. Any consumers of the streams have access to manipulate that data safely.

- Reactive forms differ from *template-driven forms* in distinct ways. Reactive forms provide synchronous access to the data model, immutability with observable operators, and change tracking through observable streams.

- *Template-driven forms* let direct access modify data in your template, but are less explicit than reactive forms because they rely on directives embedded in the template, along with mutable data to track changes asynchronously. See the Forms Overview for detailed comparisons between the two paradigms.



## Adding a basic form control