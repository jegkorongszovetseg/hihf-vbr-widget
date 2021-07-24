import isEmpty from './is-empty';

/**
 * Checks if an argument is not an empty object, not an empty array or not an empty string
 *
 * @type {(value: any) => boolean}
 */
const isNotEmpty = value => !isEmpty(value);

export default isNotEmpty;
