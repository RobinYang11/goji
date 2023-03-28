/**
 * 通过比较两个对象中相同属性大小来比较两个两个对象的大小
 * @param a 对象a
 * @param b 对象b
 * @param field 相同的字段名
 * @param sortOrder 排序规则
 * @returns {number} -1/1  倒序/正序
 */
function compareFn(a, b, field, sortOrder) {
    const valA = a[field];
    const valB = b[field];
    if (sortOrder === 'asc') {
        return valA < valB ? -1 : 1;
    } else {
        return valA > valB ? -1 : 1;
    }
}

export {compareFn}