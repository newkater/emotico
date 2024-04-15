import { logTable } from "@/constants";
import { TableClient, TableEntity } from "@azure/data-tables";
import { newId } from "./utils";

export const logger = (connectionString: string) => {
  const table = TableClient.fromConnectionString(connectionString, logTable)

  const createEntity = async (entity: TableEntity) => {
    try {
      await table.createEntity(entity);
    } catch (error) {
      console.error(error);
    }
  };

  const log = {
    info: async (key: string, value: unknown) =>
      await createEntity({
        partitionKey: newId(),
        rowKey: "INFO",
        key,
        value,
      }),
    error: async (key: string, value: unknown) =>
      await createEntity({
        partitionKey: newId(),
        rowKey: "ERROR",
        key,
        value,
      }),
  };

  return log
}