[**display-value**](README.md) • **Docs**

***

[display-value](README.md) / \<internal\>

# \<internal\>

## Interfaces

### ISettings

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `beautify?` | `boolean` | Render Arrays or Objects on multiple lines with indentation. **Default** `false` | [index.ts:9](https://github.com/DarrenPaulWright/display-value/blob/main/index.ts#L9) |
| `maxCharsPerLine?` | `number` | Render objects and arrays on one line if the rendered length is <= to this. Only applies if beautify is true. Set to 0 to wrap all objects and arrays. **Default** `0` | [index.ts:27](https://github.com/DarrenPaulWright/display-value/blob/main/index.ts#L27) |
| `preferJson?` | `boolean` | Wrap keys and strings in double quotes, similar to JSON.stringify. **Default** `true` | [index.ts:15](https://github.com/DarrenPaulWright/display-value/blob/main/index.ts#L15) |
| `preferSingleQuote?` | `boolean` | Wrap strings in single quotes. Only applicable if preferJson is false. **Default** `false` | [index.ts:21](https://github.com/DarrenPaulWright/display-value/blob/main/index.ts#L21) |
