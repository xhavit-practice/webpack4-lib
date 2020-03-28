import join from 'lodash/join';
import { Random } from 'mockjs';

export default function method1() {
    console.log(`method1 - ${join([1, 2, 3], '~')}`);
}

export function method2() {
    console.log(`method2 - ${Random.word(4, 6)}`);
}
