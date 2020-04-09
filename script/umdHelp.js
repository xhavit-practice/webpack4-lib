import deps from './deps';

/**
 * 打包为amd的情况，如果依赖的情况如下：
 * lodash/join
 * 则打包为：
 * typeof define === 'function' && define.amd ? define(['lodash/join', 'mockjs'], factory)
 * 如果想在引用整个lodash包的情况下使用本库，则需要做一下处理，因为这时候找不到lodash/join模块，
 * 思路是，单独定义对应模块，让amd库可以正确的处理依赖
 */
if (typeof define === 'function' && define.amd) {
    for (const [libName, libMethods] of Object.entries(deps)) {
        libMethods.forEach(function (method) {
            define(`${libName}/${method}`, [libName], function (libModule) {
                return libModule[method];
            });
        });
    }
}
