import { helper } from '@ember/component/helper';

export function isValidUsername([username]) {
    return username && username.length > 2;
}

export default helper(isValidUsername);