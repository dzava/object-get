import get from '../src/index'

let testObject
let testArray

describe('get', () => {
    beforeEach(() => {
        testObject = {
            foo: 'bar',
            user: {
                name: 'John',
            },
            posts: [
                {title: 'Post #1'}, {title: 'Post #2'}, {},
            ],
        }
        testArray = ['foo', 'bar', ['John']]
    })

    it('returns the object if the path is empty', () => {
        ['', null, undefined].forEach(path => {
            expect(get(testObject, path)).toBe(testObject)
            expect(get(testArray, path)).toBe(testArray)
        })
    })

    it('can get a property', () => {
        expect(get(testObject, 'foo')).toBe('bar')
    })

    it('can get an array item', () => {
        expect(get(testArray, 1)).toBe('bar')
    })

    it('can get a nested item', () => {
        expect(get(testObject, 'user.name')).toBe('John')

        expect(get(testArray, '2.0')).toBe('John')
    })

    it('supports path as an array', () => {
        expect(get(testObject, ['user', 'name'])).toBe('John')

        expect(get(testArray, ['2', '0'])).toBe('John')

        expect(get(testArray, [2, 0])).toBe('John')
    })

    it('can loop over collections', () => {
        expect(get(testObject, 'posts.*.title')).toEqual(['Post #1', 'Post #2', null])

        expect(get(testObject, 'posts.*.foo')).toEqual([null, null, null])

        expect(get(testObject, 'posts.*.foo', 'bar')).toEqual(['bar', 'bar', 'bar'])

        expect(get(testObject, '*.name')).toEqual([null, 'John', null])
        expect(get(testArray, '*.0')).toEqual(['f', 'b', 'John'])
    })

    it('returns null when the path does not exist', () => {
        ['missing', 20, 'user.name.last', '2.20'].forEach(path => {
            expect(get(testObject, path)).toBe(null)
            expect(get(testArray, path)).toBe(null)
        })
    })

    it('returns the default value when the path does not exist', () => {
        ['missing', 20, 'user.name.last', '2.20'].forEach(path => {
            expect(get(testObject, path, 'the-default')).toBe('the-default')
            expect(get(testArray, path, 'the-default')).toBe('the-default')
        })
    })
})
