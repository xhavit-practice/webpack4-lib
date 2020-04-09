import method1 from './method1';
import method2 from './method2';
import method3 from './method3';

function main() {
    console.log('lib - mian');
}
export default Object.assign(main, { method1, method2, method3 });
