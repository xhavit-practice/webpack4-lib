import join from 'lodash/join';
import random from 'lodash/random';
import reverse from './util/reverse';

export default function method1() {
    console.log(
        `method1 - ${join([1, 2, 3], '~')} - ${reverse('xyz')} - ${random(10)}`
    );
}
