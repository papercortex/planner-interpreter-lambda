import axios from "axios";
import { sendImageToGPT4V } from "./sendImageToGPT4V";
import { generateGetPresignedUrl } from "./generatePresignedUrl";
import { extractCode } from "./extractCode";
import { validateExtractedTasks } from "./validateExtractedTasks";
import { TaskInput } from "./taskSchema";

export async function interpretImage(
  bucketName: string,
  objectKey: string
): Promise<TaskInput[]> {
  try {
    const imageUrl = await generateGetPresignedUrl(bucketName, objectKey);

    const aiResponse = await sendImageToGPT4V(
      imageUrl,
      "What do you see in this image?",
      "Image:",
      "What do you think about this image?"
    );

    const tasks = validateExtractedTasks(extractCode(aiResponse));

    return tasks;
  } catch (error) {
    console.error("[interpretImage] Error: ", error);
    throw error;
  }
}
