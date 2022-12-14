# Dropdown Component

## Description
The dropdown component provides a dropdown list of values to choose from. It is possible to select multiple values, have a default value, and enforce selection.

### Properties
- **Fluid**: *boolean*. Decides whether or not the component will automatically resize to take up the full width of the page. (see [here](https://techterms.com/definition/fluid_layout) to learn more about fluid layouts).

- **Label**: *string*. Provides a text label for the component so users know what the dropdown list is for.

- **Name**: *string*. Gives a unique name to your component to easily reference in other parts of your Amazon Connect contact flow.

- **DefaultValue**: *\[string\]*. Sets a default value for the dropdown. This value should correspond with one of the "values" in your list of options.

- **HelperText**: *string* Provides helper text underneath the dropdown list to give the user additional information about the dropdown

- **Multiselect**: *boolean*. Decides whether or not the user can select multiple values from the dropdown list.

- **Clearable**: *boolean*. Decides whether or not all selected values for a dropdown can be quickly cleared with an "X" button.

- **Required**: *boolean*. Decides whether or not selecting an item from the dropdown list is required.

- **showErrors**: *boolean*. Decides whether or not to show errors next to the dropdown list (i.e. "This field is required" if the user does not select an option).

- **Options**: *\[object\]*. List of the various objects that define the different options that the user can choose from the dropdown list. Each options object will consist of a label and a value.
  - **Label**: *string*. How your option will appear in the UI to the user.
  - **Value**: *string* The actual value of your option. The value is what is returned when you check to see what option has been selected from other places in your contact flow.

## How to use
The dropdown component is used as part of the definition for the View you are working with. It should be placed within another component's "Items" section. For instance you can add it to the section of a form by filling out a copy of the template.json in this folder and pasting it as an object as part of the FormSection component's item parameter.