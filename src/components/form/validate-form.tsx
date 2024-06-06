import {FC, useEffect} from 'react';
import {Container, VStack, Box, Button} from '@chakra-ui/react';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, FormProvider, useForm} from 'react-hook-form';
import {SchemaOf, string, object, array, mixed, InferType} from 'yup';
import {FormTextField} from './form-text-field';
import {FormSelectField} from './form-select-field';
import {FormCheckboxField} from './form-checkbox-field';
import {FormRadioField} from './form-radio-field';
import {FormFileField} from './form-file-field';
import {FormTopTableField, FormLeftTableField, FormTableField, FieldList} from './form-table-field';

type TestTableKey = 'name' | 'trender' | 'email' | 'address';

type FormData = {
  name: string;
  message: string;
  select: string;
  checkbox: string[];
  radio: string;
  textarea: string;
  file: File;
  email: string;
  topTable: Record<TestTableKey, string>[];
  leftTable: Record<TestTableKey, string>[];
  table: Record<string, Record<string, string>>[];
}; // or type FormData = InferType<typeof formSchema>

// 创建 table 的 schema
const generateTableSchema = (headFieldList: string[], sideFieldList: string[]) => {
  const obj: Record<string, any> = {};
  for (let sideField of sideFieldList) {
    for (let headField of headFieldList) {
      if (sideField + '-' + headField === 'name-name') {
        obj[`${sideField}-${headField}`] = string().required();
      } else {
        obj[`${sideField}-${headField}`] = string();
      }
    }
  }
  return object(obj);
};

const generateSingleHeadTableSchema = (fieldList: string[]) => {
  const obj: Record<string, any> = {};
  for (let field of fieldList) {
    if (field === 'address') {
      obj[field] = string().required();
    } else {
      obj[field] = string();
    }
  }
  return array(object(obj));
};

// 校验规则
const formSchema = object({
  name: string().required('Name is required'),
  message: string().required('Message is required'),
  select: string().required('Select is required'),
  checkbox: array(string()).min(1).required('Checkbox is required'),
  // checkbox: mixed().oneOf<string[]>([]).required('Checkbox is required'),
  radio: string().required('Radio is required'),
  file: mixed().required(),
  textarea: string().required('Textarea is required'),
  email: string().email().required('Email is required'),
  // topTable: array().min(1).required('Top table is required'),
  topTable: generateSingleHeadTableSchema(FieldList),
  leftTable: generateSingleHeadTableSchema(FieldList),
  table: generateTableSchema(FieldList, FieldList),
  // table 两种数据类型
  // top head: [{topKey: value}], left head: [{leftKey: value}], top left head: {leftKey-topKey: value}
});

export const ValidateForm: FC = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: 'name',
      message: 'message',
      select: 'option1',
      checkbox: ['checkbox1'],
      radio: 'value1',
      textarea: 'textarea',
      email: '454@q.com',
      topTable: [{name: 'name', trender: 'trender', email: 'email', address: 'address'}],
      leftTable: [{name: 'name', trender: 'trender', email: 'email', address: 'address'}],
      // table
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('submit data', data);
  };
  return (
    <Container>
      <VStack py="4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <FormTextField label="Name" name="name"/>
            <FormTextField label="Message" name="message"/>
            <FormSelectField label="Select" name="select"/>
            <FormCheckboxField label="Checkbox" name="checkbox"/>
            <FormRadioField label="Radio" name="radio"/>
            <FormFileField label="File" name="file"/>
            <FormTextField label="Textarea" name="textarea" useTextarea/>
            <FormTextField label="Email" name="email"/>
            <FormTopTableField label="TopTable" name="topTable"/>
            <FormLeftTableField label="LeftTable" name="leftTable"/>
            <FormTableField label="Table" name="table"/>
            <Box p="2">
              <Button type="submit" colorScheme="blue">Submit</Button>
            </Box>
          </form>
        </FormProvider>
      </VStack>
    </Container>
  );
};

// 集成 UI 库, 两种方案

// 1. 通过 Controller 组件 render 属性将属性传入 UI 组件
// 2. 通过 useFormContext 二次封装 UI 组件, 在 form 根部使用 FormProvider 传入属性

