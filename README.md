# Display Value

> Converts values to a readable display string
>
> [![npm][npm]][npm-url]
[![build][build]][build-url]
[![deps][deps]][deps-url]
[![size][size]][size-url]
[![vulnerabilities][vulnerabilities]][vulnerabilities-url]
[![license][license]][license-url]


<br><a name="displayValue"></a>

### displayValue(value, [settings]) ⇒ <code>string</code>
> Takes any javascript value and returns a human readable string representation of that value. Designed for use in test messages, -0 is rendered as '-0', strings are wrapped in single quotes, and Arrays and Objects are passed through JSON.stringify.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>\*</code> |  |  |
| [settings] | <code>Object</code> |  |  |
| [settings.beautify] | <code>Boolean</code> | <code>false</code> | If true and value is an Array or Object then the output is rendered in multiple lines with indentation |

**Example**  
``` javascriptimport displayValue from 'display-value';displayValue(-0);// => "-0"displayValue('foo');// => "'foo'"displayValue({x: 1});// => "{"x": 1}"displayValue({x: 1}, {beautify: true});// => "{           "x": 1       }"```

[npm]: https://img.shields.io/npm/v/display-value.svg
[npm-url]: https://npmjs.com/package/display-value
[build]: https://travis-ci.org/DarrenPaulWright/display-value.svg?branch&#x3D;master
[build-url]: https://travis-ci.org/DarrenPaulWright/display-value
[deps]: https://david-dm.org/darrenpaulwright/display-value.svg
[deps-url]: https://david-dm.org/darrenpaulwright/display-value
[size]: https://packagephobia.now.sh/badge?p&#x3D;display-value
[size-url]: https://packagephobia.now.sh/result?p&#x3D;display-value
[vulnerabilities]: https://snyk.io/test/github/DarrenPaulWright/display-value/badge.svg?targetFile&#x3D;package.json
[vulnerabilities-url]: https://snyk.io/test/github/DarrenPaulWright/display-value?targetFile&#x3D;package.json
[license]: https://img.shields.io/github/license/DarrenPaulWright/display-value.svg
[license-url]: https://npmjs.com/package/display-value/LICENSE.md
