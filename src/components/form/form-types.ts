import {FC} from 'react';

export enum FieldTypes {
  Checkbox =  'checkbox',
  File = 'file',
  Radio = 'radio',
  Select = 'select',
  Table = 'table',
  Text = 'text',
};

export type FormItemProps = {
  label: string;
  name: string;
};

export type FormElement = {
  component: FC<FormItemProps>;
} & FormItemProps;

export type DraggableFormItemProps = {
  type: string;
  onLabelChange: (id: string, label: string) => void;
  onRemove: (id: string) => void;
  onRequiredChange: () => void;
  onOptionChange: () => void; // checkbox radio select 类型
  onHeadFieldChange: () => void; // TopTable Table 类型
  onSideFieldChange: () => void; // LeftTable Table 类型
} & FormElement;

// Field 结构
export type FormBase = {
  label: string;          // input 的标题
  name: string;           // formSchema 里的 key
  required?: boolean;     // 是否必填
};

// checkbox radio select
export type FormOption = {
  value: string | number | boolean;
  title: string;
};

// file input
export type FormFile = {
  file?: File;     // 文件对象
  url?: string;    // createObjectURL 生成或者上传成功后返回
};

// 表格
export type FormTable = 
  {headFieldList: string[], type: 'head', rowCount?: number} | 
  {sideFieldList: string[], type: 'side', columnCount?: number} | 
  {headFieldList: string[], sideFieldList: string[], type: 'compose', rowCount: number, columnCount: number};


// 分三层

// Draggable   拖动
// FormFieldLayout   处理 必填,移除,标题修改,提示文本修改      分两种类型  
// FormField 处理 选择类值的增加移除, 表格类的行数列数字段修改, 验证规则  分 表单元素组件(useForm) 和 编辑组件(useReducer)
// 表单验证 具体参照 yup

// min, max 表示长度
// required 表示必选
// msg 表示验证失败后的信息

