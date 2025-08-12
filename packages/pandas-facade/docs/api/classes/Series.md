[**pandas-facade**](../README.md)

***

# Class: Series\<T\>

Defined in: pandas-augment.d.ts:10

## Type Parameters

### T

`T` = `any`

## Constructors

### Constructor

> **new Series**\<`T`\>(`data`, `kwargs?`): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:11

#### Parameters

##### data

`Iterable`\<`T`, `any`, `any`\> | `T`[]

##### kwargs?

###### index?

(`string` \| `number`)[]

###### name?

`string`

#### Returns

`Series`\<`T`\>

## Properties

### dtype

> `readonly` **dtype**: [`DType`](DType.md)

Defined in: pandas-augment.d.ts:17

***

### index

> **index**: (`string` \| `number`)[]

Defined in: pandas-augment.d.ts:15

***

### length

> `readonly` **length**: `number`

Defined in: pandas-augment.d.ts:16

***

### name

> **name**: `string`

Defined in: pandas-augment.d.ts:14

## Methods

### abs()

> **abs**(): `Series`\<`number`\>

Defined in: pandas-augment.d.ts:27

#### Returns

`Series`\<`number`\>

***

### add()

> **add**(`other`): `Series`\<`number`\>

Defined in: pandas-augment.d.ts:28

#### Parameters

##### other

`number` | `Series`\<`number`\> | `Iterable`\<`number`, `any`, `any`\>

#### Returns

`Series`\<`number`\>

***

### append()

> **append**(`other`, `ignore_index?`): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:48

#### Parameters

##### other

`Series`\<`T`\>

##### ignore\_index?

`boolean`

#### Returns

`Series`\<`T`\>

***

### copy()

> **copy**(): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:45

#### Returns

`Series`\<`T`\>

***

### div()

> **div**(`other`): `Series`\<`number`\>

Defined in: pandas-augment.d.ts:31

#### Parameters

##### other

`number` | `Series`\<`number`\> | `Iterable`\<`number`, `any`, `any`\>

#### Returns

`Series`\<`number`\>

***

### filter()

> **filter**(`fn`): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:42

#### Parameters

##### fn

(`v`, `i`) => `boolean`

#### Returns

`Series`\<`T`\>

***

### head()

> **head**(`n?`): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:23

#### Parameters

##### n?

`number`

#### Returns

`Series`\<`T`\>

***

### iloc()

> **iloc**(`i`): `T`

Defined in: pandas-augment.d.ts:52

#### Parameters

##### i

`number`

#### Returns

`T`

***

### map()

> **map**\<`U`\>(`fn`): `Series`\<`U`\>

Defined in: pandas-augment.d.ts:41

#### Type Parameters

##### U

`U`

#### Parameters

##### fn

(`v`, `i`) => `U`

#### Returns

`Series`\<`U`\>

***

### mean()

> **mean**(): `number`

Defined in: pandas-augment.d.ts:35

#### Returns

`number`

***

### median()

> **median**(): `number`

Defined in: pandas-augment.d.ts:36

#### Returns

`number`

***

### mul()

> **mul**(`other`): `Series`\<`number`\>

Defined in: pandas-augment.d.ts:30

#### Parameters

##### other

`number` | `Series`\<`number`\> | `Iterable`\<`number`, `any`, `any`\>

#### Returns

`Series`\<`number`\>

***

### rename()

> **rename**(`name`): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:44

#### Parameters

##### name

`string`

#### Returns

`Series`\<`T`\>

***

### round()

> **round**(`places?`): `Series`\<`number`\>

Defined in: pandas-augment.d.ts:43

#### Parameters

##### places?

`number`

#### Returns

`Series`\<`number`\>

***

### std()

> **std**(): `number`

Defined in: pandas-augment.d.ts:37

#### Returns

`number`

***

### sub()

> **sub**(`other`): `Series`\<`number`\>

Defined in: pandas-augment.d.ts:29

#### Parameters

##### other

`number` | `Series`\<`number`\> | `Iterable`\<`number`, `any`, `any`\>

#### Returns

`Series`\<`number`\>

***

### sum()

> **sum**(): `number`

Defined in: pandas-augment.d.ts:34

#### Returns

`number`

***

### tail()

> **tail**(`n?`): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:24

#### Parameters

##### n?

`number`

#### Returns

`Series`\<`T`\>

***

### to\_json()

> **to\_json**(): `string`

Defined in: pandas-augment.d.ts:21

#### Returns

`string`

***

### toArray()

> **toArray**(): `T`[]

Defined in: pandas-augment.d.ts:54

#### Returns

`T`[]

***

### toString()

> **toString**(): `string`

Defined in: pandas-augment.d.ts:20

#### Returns

`string`

***

### unique()

> **unique**(): `Series`\<`T`\>

Defined in: pandas-augment.d.ts:49

#### Returns

`Series`\<`T`\>

***

### values()

> **values**(): `T`[]

Defined in: pandas-augment.d.ts:22

#### Returns

`T`[]

***

### variance()

> **variance**(): `number`

Defined in: pandas-augment.d.ts:38

#### Returns

`number`
