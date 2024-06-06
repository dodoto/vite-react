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

export class MessageModel extends Model {
  public static table: string = 'messages';

  @readonly @date('created_at') createdAt!: Date;
  @text('content') content!: string;

  @writer async remove() {
    console.log('开始删除');
    await this.destroyPermanently();
    console.log('成功删除');
  }
};

export interface IMessageModelAddableFields {
  content: string;
}



