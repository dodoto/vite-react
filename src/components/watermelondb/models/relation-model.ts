import { Model, Query, Relation } from '@nozbe/watermelondb';
import {
  date, 
  readonly, 
  field, 
  text, 
  relation, 
  immutableRelation,
  children,
  writer,
  action,
} from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import { setGenerator } from '@nozbe/watermelondb/utils/common/randomId';

enum TableName {
  AUTHORS = 'authors',
  OPUS = 'opus',
}

export class AuthorModel extends Model {
  public static table = TableName.AUTHORS

  static associations: Associations = {
    [TableName.OPUS]: { type: 'has_many', foreignKey: 'author_id' },
  }

  @field('name') name!: string;
  @children(TableName.OPUS) opus!: Query<OpusModel>;

  @writer async addOpus(title: string) {
    return this.collections.get<OpusModel>(TableName.OPUS).create(opus => {
      opus.author.set(this);
      Object.assign(opus, {title});
    });
  }
}

export class OpusModel extends Model {
  public static table = TableName.OPUS

  public static associations: Associations = {
    [TableName.AUTHORS]: { type: 'belongs_to', key: 'author_id' },
  }

  @field('title') title!: string;
  @relation(TableName.AUTHORS ,'author_id') author!: Relation<AuthorModel>

}
