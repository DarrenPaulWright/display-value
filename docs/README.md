**display-value** • **Docs**

***

# display-value

## Functions

### default()

```ts
function default(value: unknown, settings: ISettings): string
```

Designed for use in test messages, displayValue takes a javascript value and returns a human-readable string representation of that value.

Notes:
- Finite numbers are passed through number.toLocaleString()
  - -0 is rendered as -0
  - 1300 is rendered as 1,300 (depending on locale)
- Strings are wrapped in double quotes
- Arrays and Objects are passed through a function similar to JSON.stringify, but values are individually run through displayValue
- Array-like values such as arguments are handled like Arrays
- Object-like values such as ClientRect and DOMRect are handled like Objects
- Constructors will return the constructor's name
- Instances of non-native constructors:
  - will return the result of .toString() if other than '[object Object]'
  - otherwise returns '[object Name]' where Name is the constructor's name

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |
| `settings` | [`ISettings`](-internal-.md#isettings) |

#### Returns

`string`

#### Example

``` javascript
import displayValue from 'display-value';

displayValue(-0); // '-0'
displayValue(1300000); // '1,300,000'
displayValue('foo'); // '"foo"'
displayValue({ x: 1 }); // '{ "x": 1 }'

displayValue(() => {}); // '() => {…}'
displayValue(function(param) {}); // 'ƒ (param) {…}'
displayValue(function name() {}); // 'ƒ name() {…}'

displayValue(Symbol()); // 'Symbol()'
displayValue(Symbol('name')); // 'Symbol(name)'

displayValue(new CustomClass()); // '[object CustomClass]'

displayValue([{x: 1}, {x: 2000}], { beautify: true });
// '[{
//     "x": 1
// }, {
//     "x": 2,000
// }]'
```

#### Defined in

[index.ts:73](https://github.com/DarrenPaulWright/display-value/blob/main/index.ts#L73)

## Modules

| Module | Description |
| ------ | ------ |
| [\<internal\>](-internal-.md) | - |
