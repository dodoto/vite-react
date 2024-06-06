// yup
import {useEffect} from 'react';
import {SchemaOf, string, object, array, mixed, number, setLocale} from 'yup';

// api: transform 
export const useYupTransform = () => {
  console.log('transform');
  useEffect(() => {
    const num = number().cast('1');
    const obj = object({
      firstName: string().lowercase().trim(),
    })
    .camelCase()
    .cast('{"fisrt_name": "jAne"}');
    console.log(num, obj);
    // custom transform
    const reverseString = string()
      .transform((value: string) => (
        value.split('').reverse().join('')
      ))
      .cast(12);  

  }, []);
};

// api: validate, test, validateSync
export const useYupValidate = () => {
  console.log('validate');
  useEffect(() => {
    string()
      .min(3, 'must be at least 3 charactres long')
      .email('must be a valid email')
      .validate('test@email.com');

    // custom validate
    const jamesSchema = string().test(
      'is-james',
      // 错误处理
      (d) => `${d.path} is not James`,
      // 验证的值
      value => (value == null || value === 'James'),
    );

    jamesSchema.validate('James');
    jamesSchema.validate('Jane'); // this is not James

    // custom validate errors
    const order = object({
      no: number().required(),
      sku: string()
            .test({
              name: 'is-sku',
              test(value, ctx) {
                if (!value?.startsWith('s-')) {
                  return ctx.createError({message: 'SKU missing correct prefix'});
                }
                if (!value?.endsWith('-42a')) {
                  return ctx.createError({message: 'SKU missing correct suffix'});
                }
                if (value.length < 10) {
                  return ctx.createError({message: 'SKU is not the right length'});
                }
                return true
              },
            })
    })
    
    order.validate({ no: 1234, sku: 's-1a45-14a' }); // SKU missing correct suffix

  }, []);
};

// api default
export const useYupDefault = () => {
  console.log('default');
  useEffect(() => {
    const value1: string = string().default('hi').validateSync(undefined); // hi
    const value2: string | undefined = string().validateSync(undefined); // undefined

    console.log(value1, value2);
  }, []);
};

// api addMethod, add custom method to pipeline

// api setLocale, locale default error message
/**
 * setLocale({
 *    string: {
 *      required: '字符串是必须的',
 *    }
 * });
 * 
 * string().reqired().validate(undefined) // 字符串是必须的 === string().reqired('字符串是必须的').validate(undefined)
 */

export const YupScript = () => {
  useYupTransform();
  useYupValidate();
  useYupDefault();
  return null;
};
