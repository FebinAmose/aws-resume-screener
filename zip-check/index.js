const { BedrockRuntimeClient, ConverseCommand } = require("@aws-sdk/client-bedrock-runtime");

const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { resumeText } = body;

    if (!resumeText) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "resumeText is required" }),
      };
    }

    const prompt = `You are an expert HR consultant and cloud job recruiter in India.

Analyze the following resume and provide:
1. Overall Score (out of 10) for AWS Cloud Developer role
2. Strengths (what is good)
3. Missing Skills (what to add)
4. Top 3 Recommendations to improve for Indian job market
5. Best Job Titles to apply for right now

Resume:
${resumeText}

Give clear, specific, actionable feedback.`;

    const command = new ConverseCommand({
      modelId: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
      messages: [{ role: "user", content: [{ text: prompt }] }],
      inferenceConfig: { maxTokens: 1000, temperature: 0.7 },
    });

    const response = await bedrock.send(command);
    const analysis = response.output.message.content[0].text;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ analysis }),
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};