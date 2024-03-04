import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function sendImageToGPT4V(
  imageUrl: string,
  promptBeforeImage: string | null,
  promptImage: string,
  promptAfterImage: string | null
): Promise<string> {
  const messages: OpenAI.ChatCompletionMessageParam[] = []

  if (promptBeforeImage) {
    messages.push({
      role: 'user',
      content: promptBeforeImage,
    })
  }

  messages.push({
    role: 'user',
    content: [
      {
        type: 'text',
        text: promptImage,
      },
      {
        type: 'image_url',
        image_url: {
          url: imageUrl,
        },
      },
    ],
  })

  if (promptAfterImage) {
    messages.push({
      role: 'user',
      content: promptAfterImage,
    })
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages,
      max_tokens: 2056,
    })

    console.log('Response from GPT-4V:', response)

    if (response.choices.length === 0) {
      throw new Error('No response.choices from GPT-4V')
    }

    if (!response.choices[0]?.message?.content) {
      throw new Error('No response.choices[0]?.message?.content from GPT-4V')
    }

    return response.choices[0]?.message.content
  } catch (error) {
    console.error('[sendImageToGPT4V] Error: ', error)
    throw error
  }
}
