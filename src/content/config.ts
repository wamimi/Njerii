import { defineCollection, z } from 'astro:content';

const formulations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

const experiments = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    status: z.enum(['active', 'completed', 'archived']).default('active'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  formulations,
  experiments,
};