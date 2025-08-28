'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered explanations for risk levels.
 *
 * The flow takes a risk level and relevant data as input and returns a detailed explanation in Chinese.
 * This explanation helps auditors understand the system's reasoning behind the risk assessment.
 *
 * - `getRiskLevelExplanation` - The main function to trigger the risk level explanation flow.
 * - `RiskLevelExplanationInput` - The input type for the `getRiskLevelExplanation` function.
 * - `RiskLevelExplanationOutput` - The output type for the `getRiskLevelExplanation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskLevelExplanationInputSchema = z.object({
  riskLevel: z.string().describe('The risk level assigned (e.g., High, Medium, Low).'),
  relevantData: z.string().describe('Relevant data associated with the risk assessment.'),
});

export type RiskLevelExplanationInput = z.infer<typeof RiskLevelExplanationInputSchema>;

const RiskLevelExplanationOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of why the risk level was assigned, in Chinese.'),
});

export type RiskLevelExplanationOutput = z.infer<typeof RiskLevelExplanationOutputSchema>;

export async function getRiskLevelExplanation(input: RiskLevelExplanationInput): Promise<RiskLevelExplanationOutput> {
  return riskLevelExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskLevelExplanationPrompt',
  input: {schema: RiskLevelExplanationInputSchema},
  output: {schema: RiskLevelExplanationOutputSchema},
  prompt: `你是一名专业的风险评估解释员。你的任务是根据给定的风险等级和相关数据，用中文详细解释为什么会给出这个风险等级。

风险等级: {{{riskLevel}}}
相关数据: {{{relevantData}}}

请用清晰、简洁的语言解释风险评估的依据和逻辑。`,
});

const riskLevelExplanationFlow = ai.defineFlow(
  {
    name: 'riskLevelExplanationFlow',
    inputSchema: RiskLevelExplanationInputSchema,
    outputSchema: RiskLevelExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
