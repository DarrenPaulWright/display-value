import { lucidNode } from 'eslint-config-lucid';
import lucidTypescriptConfig from 'eslint-config-lucid-typescript';

export default [
	{
		ignores: [
			'**/*.d.ts'
		]
	},
	...lucidNode,
	...lucidTypescriptConfig
];
