import {appSchema, tableSchema} from '@nozbe/watermelondb';

/**
 * 命名规范 snake_case
 * id created_at updated_at _status _changed 是特殊字段, 不需要定义, 在 model 里添加即可
 * 
 * watermelondb 不能自动检测到 schema 的变化, 所以每次修改必须自增 version (相当于数据版本)
 * 但是这么做会导致数据全部丢失, 所以使用 migrations 来进行无缝更新
 */
export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'todos',
      columns: [
        {name: 'task_id', type: 'string', isIndexed: true},
        {name: 'is_completed', type: 'boolean'},
        {name: 'task', type: 'string'},
        {name: 'prepare_completed_at', type: 'number'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'help_text', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'content', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'authors',
      columns: [
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'opus',
      columns: [
        { name: 'author_id', type: 'string' },
        { name: 'title', type: 'string' },
      ],
    }),
  ],
});