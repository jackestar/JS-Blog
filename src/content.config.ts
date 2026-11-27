import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {z} from 'astro/zod';
import {docsLoader, i18nLoader} from '@astrojs/starlight/loaders';
import {docsSchema, i18nSchema} from '@astrojs/starlight/schema';
import {skillKeys} from './components/showcase/skills';

const showcases = defineCollection({
  loader: glob({pattern: '*.md', base: './src/content/showcases'}),
  schema: ({image}) =>
    z.object({
      title: z.string(),
      order: z.number(),
      media: z
        .array(
          z.discriminatedUnion('type', [
            z.object({type: z.literal('image'), src: image(), alt: z.string()}),
            z.object({
              type: z.literal('video'),
              // Videos /public.
              src: z.string(),
              webm: z.string().optional(),
              poster: image(),
              alt: z.string(),
            }),
          ]),
        )
        .min(1),
      skills: z.array(z.enum(skillKeys)).default([]),
      link: z.string().optional(),
    }),
});

export const collections = {
  docs: defineCollection({loader: docsLoader(), schema: docsSchema()}),
  i18n: defineCollection({loader: i18nLoader(), schema: i18nSchema()}),
  showcases,
};
