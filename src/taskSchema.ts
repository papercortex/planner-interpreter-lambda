export interface TaskInput {
  status: "NEW" | "DONE";
  date: Date;
  fromTime: string;
  toTime: string;
  tags: [string];
  priority: "default" | "minor" | "major" | "blocker";
}

export const taskSchema = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["NEW", "DONE"] },
    date: { type: "string", format: "date" },
    fromTime: { type: "string" },
    toTime: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    priority: {
      type: "string",
      enum: ["default", "minor", "major", "blocker"],
    },
  },
  required: ["status", "date", "fromTime", "toTime", "tags", "priority"],
  additionalProperties: false,
};
