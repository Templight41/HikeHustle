export const DBConfig = {
    name: "HikeHustle",
    version: 1,
    objectStoresMeta: [
      {
        store: "allTodos",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
            { name: "id", keypath: "id", options: { unique: false }},
            { name: "task", keypath: "task", options: { unique: false }},
            { name: "completed", keypath: "completed", options: { unique: false}},
            { name: "completeBy", keypath: "completeBy", options: { unique: false }}
        ],
      },
    ],
  };