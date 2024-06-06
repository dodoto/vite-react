import {Model} from '@nozbe/watermelondb';
import {
  date, 
  readonly, 
  field, 
  text, 
  relation, 
  immutableRelation,
  children,
  writer,
} from '@nozbe/watermelondb/decorators';
import {Q} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';

export class TodoModel extends Model {
  public static table: string = 'todos';
  // 这里来定义外键
  // public static associations: Associations = {

  // };
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
  @field('task_id') taskId!: string;
  @field('is_completed') isCompleted!: boolean;
  @text('task') task!: string;
  @date('prepare_completed_at') prepareCompletedAt!: Date;
  @field('help_text') helpText!: string;

  // 和 mobx 一样这里也可以写 get 关键字做派生行为
  /**
   * get createdDateString() {
   *   return ...
   * }
   */

  // 单个字段 relation 和 immutableRelation 关联其他表的字段
  // 多个字段 children 配合 associations 使用, 还可以配合 Q 做自定义查询语句或继承已经存在的查询语句
   
  // 必须要有 writer 修饰符, 才能更新数据库
  // @writer async updateTest() {
  //   await this.update(todos => {
  //     todos.task = ...
  //   })
  // }
  // @writer async addTodo({taskId, isCompleted, task, prepareCompletedAt}: {
  //   taskId: string;
  //   isCompleted: boolean;
  //   task: string;
  //   prepareCompletedAt: Date;
  // }) {
  //   return await this.collections.get<TodoModel>('todos').create(todo => {
  //     todo.taskId = taskId;
  //     todo.isCompleted = isCompleted;
  //     todo.task = task;
  //     todo.prepareCompletedAt = prepareCompletedAt;
  //   })
  // }

  @writer async deleteTodo() {
    console.log('开始删除');
    await this.destroyPermanently();
    console.log('成功删除');
  }

  @writer async completeTodo() {
    await this.update(todo => {
      todo.isCompleted = true;
    })
  }

  @writer async editHelpText(text: string) {
    await this.update(todo => {
      todo.helpText = text;
    })
  }
}

export interface ITodoModelAddableFields {
  taskId: string;
  task: string;
  prepareCompletedAt: Date;
}