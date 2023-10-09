import type { ObjectId } from "mongodb";

declare namespace Db {
  // Database Data Props Config
  declare namespace DataType {
    type UserProps = {
      name: string;
    };
    type EventProps = {
      name: string;
    };
  }
  // Database Type Config
  type DocumentType = "server" | "client";
  type DocumentIdProps<Type extends DocumentType> = {
    _id: Type extends "server" ? ObjectId : string;
  };
  type DocumentDataProps<DataInterface extends object> = {
    data: DataInterface;
  };
  type Document<
    DataInterface extends object,
    Type extends DocumentType
  > = DocumentIdProps<Type> & DocumentDataProps<DataInterface>;
  // Database Server Config
  declare namespace Server {
    type Document<DataInterface extends object> = Db.Document<
      DataInterface,
      "server"
    >;

    type User = Document<Db.DataType.UserProps>;
    type Event = Document<Db.DataType.EventProps>;
  }
  // Database Client Config
  declare namespace Client {
    type Document<DataInterface extends object> = Db.Document<
      DataInterface,
      "client"
    >;

    type User = Document<Db.DataType.UserProps>;
    type Event = Document<Db.DataType.EventProps>;
  }
}
