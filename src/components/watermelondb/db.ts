import { Database, Query, Model } from '@nozbe/watermelondb';
import { useState, useRef, useEffect } from 'react';
import {schema} from './schema';
import {migrations} from './migrations';
import {MessageModel, TodoModel, AuthorModel, OpusModel} from './models';

// react-native
// import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
// const adapter = new SQLiteAdapter({
//   schema,
//   migrations,
//   jsi: true,
//   onSetUpError: error => {},
// });

// web
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
const adapter = new LokiJSAdapter({
  schema,
  // migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  // dbName: optional,
  onQuotaExceededError(error) {
    // Browser ran out of disk space -- offer the user to reload the app or log out 
  },
  onSetUpError(error) {
    // Database failed to load -- offer the user to reload the app or log out
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite() {
      // Called when this adapter is forced to overwrite contents of IndexedDB.
      // This happens if there's another open tab of the same app that's making changes.
      // Try to synchronize the app now, and if user is offline, alert them that if they close this
      // tab, some data may be lost
    },
    onversionchange() {
      // database was deleted in another browser tab (user logged out), so we must make sure we delete
      // it in this tab as well - usually best to just refresh the page
      // if (checkIfUserIsLoggedIn()) {
      //   window.location.reload()
      // }
    },
  },
});


export const database = new Database({
  adapter,
  modelClasses: [
    // add Models to Watermelon here
    TodoModel,
    MessageModel,
    AuthorModel,
    OpusModel,
  ],
});

console.log('this is database');
console.log(database);

export const useCollection = <T extends Model, U>(tableName: string) => {
  const collection = useRef(database.get<T>(tableName)).current;
  const [data, setData] = useState<Query<T>>();

  const add = (item: U) => {
    database.write(async () => {
      await collection.create(newItem => {
        Object.assign(newItem, item);
      });
    });
  };

  useEffect(() => {
    const data = collection.query();
    setData(data);
  }, []);

  return {
    data,
    add,
  };
}

export const useMessagesCollection = () => {
  const messageCollection = useRef(database.get<MessageModel>('messages')).current;
  const [messages, setMessages] = useState<Query<MessageModel>>();

  const addMessage = (text: string) => {
    database.write(async () => {
      await messageCollection.create(message => {
        message.content = text;
      });
    });
  };

  useEffect(() => {
    const messages = messageCollection.query();
    setMessages(messages);
  }, []);

  return {
    messages,
    addMessage,
  };
};

/**
 * setup 流程
 * tables = schema
 * extraTables = migration
 * schema + migration + handler + options = adapter
 * adapter + model = db
 * model 结构和 mobx 的 model类似, 是 table 的映射, 里面定义读写的方法
 * 读写流程
 * const collection = db.get(tableName)
 * // by id
 * const oneRecord = await collection.find(id)
 * // query
 * const records = await collection.query().fetch()
 * // filter
 * const filterRecords = await collection.query(Q.method(key, value)).fetch()
 * // modify
 * await db.write(async () => {
 *   const record = await db.get(tableName).find(id)
 *   await record.update(() => {
 *     record[key] = newValue
 *   })
 * })
 * // if definedd @writer on Model, just await record.writerMethod
 * // create
 * const newRecord = await db.get(tableName).create(record => {
 *   record[key] = value
 * })
 * // delete Do not access, update, or observe records after they're deleted.
 * record.markAsDeleted() // syncalble         数据同步
 * record.destroyPermanently() // permannent   本地删除
 * 
 * table -> collection -> model
 * withObservables: 如果需要 observe, 传入 query(), fetch() 上没有 observe 方法
 * babel 要配置正确, 否则无法写入数据库
 * 更新数据库:
 * 在 schema 对表进行修改后, 要在 migrations 里添加上, 在确认一致后再修改 version 生效.
 * 如果 column 里没有 updated_at, 将无法修改数据.
 */

