export const DBConfig = {
  name: "HikeHustle",
  version: 1,
  objectStoresMeta: [
    {
      store: "allTodos",
      storeConfig: { keyPath: "id" },
      storeSchema: [
        { name: "task", keypath: "task", options: { unique: false } },
        { name: "completed", keypath: "completed", options: { unique: false } },
        { name: "completeBy", keypath: "completeBy", options: { unique: false } },
      ],
    },
  ],
};