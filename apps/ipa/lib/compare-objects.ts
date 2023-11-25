import { isArray, isEqual, isObject, transform } from 'lodash';

/* Returns difference between two objects, utilized to compare changes in settings */

const compareObjects = (object1, object2) => {
  function changes(object2, object1) {
    let arrayIndexCounter = 0;
    return transform(object2, function (result, value, key) {
      if (!isEqual(value, object1[key])) {
        let resultKey = isArray(object1) ? arrayIndexCounter++ : key;
        result[resultKey] =
          isObject(value) && isObject(object1[key])
            ? changes(value, object1[key])
            : value;
      }
    });
  }

  return changes(object2, object1);
};
export default compareObjects;
