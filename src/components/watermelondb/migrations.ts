import {addColumns, createTable, schemaMigrations} from '@nozbe/watermelondb/Schema/migrations';

/**
 * 架构迁移是一种机制，您可以通过它以向后兼容的方式向数据库添加新的表和列。
 */
export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 1, 
      steps: [
        // createTable({
        //   name: 'todos',
          // columns: [
          //   { name: 'created_at', type: 'number' },
          //   { name: 'updated_at', type: 'number' },
          // ]
        // }),
        // addColumns({
        //   table: 'todos',
        //   columns: [
        //     // { name: 'created_at', type: 'number' },
        //     // { name: 'updated_at', type: 'number' },
        //     { name: 'help_text', type: 'string' }, 
        //   ],
        // }),
        // createTable({
        //   name: 'messages',
        //   columns: [
        //     {name: 'content', type: 'string'},
        //   ],
        // }),
        // createTable({
        //   name: 'authors',
        //   columns: [
        //     { name: 'name', type: 'string' },
        //   ],
        // }),
        // createTable({
        //   name: 'opus',
        //   columns: [
        //     { name: 'author_id', type: 'string' },
        //     { name: 'title', type: 'string' },
        //   ],
        // }),
      ],
    }
  ],
});

