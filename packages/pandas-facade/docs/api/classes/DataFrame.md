[**pandas-facade**](../README.md)

***

# Class: DataFrame\<T\>

Defined in: pandas-augment.d.ts:59

## Type Parameters

### T

`T` *extends* `Row` = `Row`

## Constructors

### Constructor

> **new DataFrame**\<`T`\>(`rows`): `DataFrame`\<`T`\>

Defined in: pandas-augment.d.ts:60

#### Parameters

##### rows

`T`[]

#### Returns

`DataFrame`\<`T`\>

## Properties

### index

> **index**: (`string` \| `number`)[]

Defined in: pandas-augment.d.ts:63

***

### length

> **length**: `number`

Defined in: pandas-augment.d.ts:65

## Methods

### append()

> **append**(`df`): `DataFrame`\<`T`\>

Defined in: pandas-augment.d.ts:86

#### Parameters

##### df

`DataFrame`\<`T`\>

#### Returns

`DataFrame`\<`T`\>

***

### asTyped()

> **asTyped**\<`U`\>(): `DataFrame`\<`U`\>

Defined in: pandas-augment.d.ts:95

#### Type Parameters

##### U

`U` *extends* `Row`

#### Returns

`DataFrame`\<`U`\>

***

### columns()

> **columns**(): `string`[]

Defined in: pandas-augment.d.ts:64

#### Returns

`string`[]

***

### copy()

> **copy**(): `DataFrame`\<`T`\>

Defined in: pandas-augment.d.ts:77

#### Returns

`DataFrame`\<`T`\>

***

### get()

> **get**(`col`): [`Series`](Series.md)\<`T`\[keyof `T`\]\>

Defined in: pandas-augment.d.ts:73

#### Parameters

##### col

keyof `T` & `string`

#### Returns

[`Series`](Series.md)\<`T`\[keyof `T`\]\>

***

### groupBy()

> **groupBy**\<`K`\>(...`cols`): `Map`\<`string`, `DataFrame`\<`T`\>\>

Defined in: pandas-augment.d.ts:97

#### Type Parameters

##### K

`K` *extends* `string`

#### Parameters

##### cols

...`K`[]

#### Returns

`Map`\<`string`, `DataFrame`\<`T`\>\>

***

### head()

> **head**(`n?`): `DataFrame`\<`T`\>

Defined in: pandas-augment.d.ts:75

#### Parameters

##### n?

`number`

#### Returns

`DataFrame`\<`T`\>

***

### iloc()

> **iloc**(`i`): `T`

Defined in: pandas-augment.d.ts:92

#### Parameters

##### i

`number`

#### Returns

`T`

***

### mean()

> **mean**(): [`Series`](Series.md)\<`number`\>

Defined in: pandas-augment.d.ts:81

#### Returns

[`Series`](Series.md)\<`number`\>

***

### merge()

> **merge**\<`U`\>(`other`): `DataFrame`\<`T` & `U`\>

Defined in: pandas-augment.d.ts:87

#### Type Parameters

##### U

`U` *extends* `Row`

#### Parameters

##### other

`DataFrame`\<`U`\>

#### Returns

`DataFrame`\<`T` & `U`\>

***

### reset\_index()

> **reset\_index**(`args?`): `DataFrame`\<`T`\>

Defined in: pandas-augment.d.ts:91

#### Parameters

##### args?

###### drop?

`boolean`

#### Returns

`DataFrame`\<`T`\>

***

### select()

> **select**\<`K`\>(...`cols`): `DataFrame`\<`Pick`\<`T`, `K`\>\>

Defined in: pandas-augment.d.ts:96

#### Type Parameters

##### K

`K` *extends* `string`

#### Parameters

##### cols

...`K`[]

#### Returns

`DataFrame`\<`Pick`\<`T`, `K`\>\>

***

### set()

> **set**\<`K`\>(`col`, `series`): `DataFrame`\<`T` & `Record`\<`K`, `any`\>\>

Defined in: pandas-augment.d.ts:74

#### Type Parameters

##### K

`K` *extends* `string`

#### Parameters

##### col

`K`

##### series

`any`[] | [`Series`](Series.md)\<`any`\>

#### Returns

`DataFrame`\<`T` & `Record`\<`K`, `any`\>\>

***

### std()

> **std**(): [`Series`](Series.md)\<`number`\>

Defined in: pandas-augment.d.ts:82

#### Returns

[`Series`](Series.md)\<`number`\>

***

### sum()

> **sum**(): [`Series`](Series.md)\<`number`\>

Defined in: pandas-augment.d.ts:80

#### Returns

[`Series`](Series.md)\<`number`\>

***

### tail()

> **tail**(`n?`): `DataFrame`\<`T`\>

Defined in: pandas-augment.d.ts:76

#### Parameters

##### n?

`number`

#### Returns

`DataFrame`\<`T`\>

***

### to\_json()

> **to\_json**(): `string`

Defined in: pandas-augment.d.ts:68

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Defined in: pandas-augment.d.ts:69

#### Returns

`string`

***

### transpose()

> **transpose**(): `DataFrame`\<`any`\>

Defined in: pandas-augment.d.ts:88

#### Returns

`DataFrame`\<`any`\>

***

### values()

> **values**(): `T`[]

Defined in: pandas-augment.d.ts:70

#### Returns

`T`[]

***

### variance()

> **variance**(): [`Series`](Series.md)\<`number`\>

Defined in: pandas-augment.d.ts:83

#### Returns

[`Series`](Series.md)\<`number`\>
