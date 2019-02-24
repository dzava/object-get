Get the property of an a object using a path.

## Install

```bash
yarn add @dzava/object-get
```

## Usage

```js
import get from '@dzava/object-get'

const o = {
    foo: 'bar',
    users: [ {name: 'John', last: 'Smith'}, {name: 'Jane'} ],
}

get(o, 'some.key', null) // null
get(o, 'foo') // bar
get(o, 'users.0.name') // John
get(o, 'users.*.name') // ['John', 'Jane']
get(o, 'users.*.last', null) // ['Smith', null]
```

## License

The [MIT License (MIT)](LICENSE.md).
