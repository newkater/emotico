import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { TableClient, TableServiceClient } from "@azure/data-tables";
import { Failure, Success } from "./utils";

const connectionString = process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING ?? ""

export const uploadFileFromBuffer = async (
  buffer: Buffer,
  client: ContainerClient,
  name: string,
  type: string
): Promise<Result<string>> => {
  const blobClient = client.getBlockBlobClient(name);
  const options = { blobHTTPHeaders: { blobContentType: type } };
  try {
    await blobClient.uploadData(buffer, options);
    return Success(blobClient.url);
  } catch (error) {
    console.error(error);
    return Failure({
      type: "SERVER",
      message: "Error uploading file " + name,
    });
  }
};

export const getContainerClient = async (connectionString: string, container: string) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const blobContainerClient = blobServiceClient.getContainerClient(container);
  await blobContainerClient.createIfNotExists({
    access: "container",
  })
  return blobContainerClient
}

export const getTableServiceClient = async () => {
  return TableServiceClient.fromConnectionString(connectionString)
}

export const getTableClient = (table: string) => {
  return TableClient.fromConnectionString(connectionString, table)
}
