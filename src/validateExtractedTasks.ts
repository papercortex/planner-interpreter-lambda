import Ajv from "ajv";
import { TaskInput, taskSchema } from "./taskSchema";

const ajv = new Ajv();

export function validateExtractedTasks(response: string | null): TaskInput[] {
  let tasks: TaskInput[];

  if (!response) {
    throw new Error("No response from GPT found");
  }

  try {
    tasks = JSON.parse(response);
  } catch (err) {
    throw new Error("GPT returned invalid JSON for the first code block");
  }

  if (!tasks) {
    throw new Error("No tasks found in the response");
  }

  if (tasks.length === 0) {
    throw new Error("No tasks found in the response");
  }

  const validate = ajv.compile(taskSchema);
  const valid = tasks.every((task) => validate(task));

  if (!valid) {
    console.error(validate.errors);
    throw new Error("Invalid tasks found in the response");
  }

  return tasks;
}
