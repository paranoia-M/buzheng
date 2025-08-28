'use server';

/**
 * @fileOverview An AI agent to determine which risk rules to apply based on user behavior and context.
 *
 * - ruleEngineDetermination - A function that determines the risk rules to apply.
 * - RuleEngineDeterminationInput - The input type for the ruleEngineDetermination function.
 * - RuleEngineDeterminationOutput - The return type for the ruleEngineDetermination function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RuleEngineDeterminationInputSchema = z.object({
  userBehavior: z
    .string()
    .describe('Description of the user behavior, including actions and context.'),
  userContext: z
    .string()
    .describe('Additional context about the user, such as demographics or history.'),
});
export type RuleEngineDeterminationInput = z.infer<
  typeof RuleEngineDeterminationInputSchema
>;

const RuleEngineDeterminationOutputSchema = z.object({
  applicableRules: z
    .array(z.string())
    .describe('An array of risk rule names that should be applied.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the selection of the rules.'),
});
export type RuleEngineDeterminationOutput = z.infer<
  typeof RuleEngineDeterminationOutputSchema
>;

export async function ruleEngineDetermination(
  input: RuleEngineDeterminationInput
): Promise<RuleEngineDeterminationOutput> {
  return ruleEngineDeterminationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ruleEngineDeterminationPrompt',
  input: {schema: RuleEngineDeterminationInputSchema},
  output: {schema: RuleEngineDeterminationOutputSchema},
  prompt: `You are an expert risk analyst. Your task is to determine which risk rules should be applied based on the user's behavior and context.

Here are some example risk rules:

- Suspicious Login: Triggered when a user logs in from an unusual location or device.
- Excessive Spending: Triggered when a user spends an unusually large amount of money in a short period.
- Account Takeover: Triggered when there are multiple failed login attempts followed by a successful login.

Consider the following user behavior and context:

User Behavior: {{{userBehavior}}}
User Context: {{{userContext}}}

Based on this information, determine which risk rules should be applied. Provide a clear reasoning for your choices.

Output the applicable rules as an array of strings, and the reasoning behind the selection.

{{outputFormat instructions='Output the applicableRules field as an array of strings.  Output the reasoning behind the selection in the reasoning field.'}}
`,
});

const ruleEngineDeterminationFlow = ai.defineFlow(
  {
    name: 'ruleEngineDeterminationFlow',
    inputSchema: RuleEngineDeterminationInputSchema,
    outputSchema: RuleEngineDeterminationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
