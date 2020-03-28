import template from 'lodash/template';
import { Random } from 'mockjs';

export default function method1() {
    const str = template('method1 - <%= word %>')({ word: Random.word(4, 6) });
    console.log(str);
}

export function method2() {
    console.log(`method2 - ${Random.word(4, 6)}`);
}
