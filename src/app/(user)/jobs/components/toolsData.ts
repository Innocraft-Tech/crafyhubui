import { z } from 'zod';

const onSchema = z
  .union([
    z.tuple([
      z.literal('hourly'),
      z.string().optional(),
      z.string().optional(),
      z.string().optional(),
    ]),
    z.tuple([
      z.literal('weekly'),
      z.string().optional(),
      z.string().optional(),
    ]),
    z.tuple([
      z.literal('monthly'),
      z.string().optional(),
      z.string().optional(),
    ]),
  ])
  .refine(
    (value) => {
      const [, minRate, maxRate] = value;
      return !(minRate && !maxRate) || (!minRate && !maxRate);
    },
    {
      message: 'Please enter Max rate',
      path: [2],
    },
  )
  .refine(
    (value) => {
      const [, minRate, maxRate] = value;
      return !(!minRate && maxRate) || (!minRate && !maxRate);
    },
    {
      message: 'Please enter Min rate',
      path: [1],
    },
  )
  .refine(
    (value) => {
      const [, minRate, maxRate] = value;
      if (minRate && maxRate) {
        return parseFloat(minRate) <= parseFloat(maxRate);
      }
      return true;
    },
    {
      message: 'Max rate should be greater than Min rate',
      path: [2],
    },
  );

const oneTimeSchema = z
  .array(z.union([z.string(), z.number()]))
  .length(4)
  .refine((array) => !(array[0] && !array[1]) || (!array[0] && !array[1]), {
    message: 'Please enter Max rate',
    path: [1],
  })
  .refine((array) => !(!array[0] && array[1]) || (!array[0] && !array[1]), {
    message: 'Please enter Min rate',
    path: [0],
  })
  .refine(
    (array) => parseFloat(array[1] as string) >= parseFloat(array[0] as string),
    {
      message: 'Max rate should be greater than Min rate',
      path: [1],
    },
  );

export const jobsSchema = z.object({
  requiredSkills: z.array(z.string()).min(3),
  jobTitle: z.string(),
  jobDescription: z.string(),
  languages: z.array(z.string()).min(1),
  paymentOneTime: z.boolean(),
  paymentOngoing: z.boolean(),
  oneTime: z.array(z.union([z.string(), z.number()])).length(4),
  onGoing: z.array(z.union([z.string(), z.number()])).length(4),
});

// .refine(
//   (data) => {
//     if (data.paymentOneTime && !data.paymentOngoing) {
//       return oneTimeSchema.safeParse(data.oneTime).success;
//     }
//     if (!data.paymentOneTime && data.paymentOngoing) {
//       return onSchema.safeParse(data.ongoing).success;
//     }
//     return true;
//   },
//   {
//     message:
//       'Please fill in the required fields for the selected payment method.',
//     path: ['oneTime', 'ongoing'],
//   },
// );

// const onSchema = z
//   .union([
//     z.tuple([
//       z.literal('hourly'),
//       z.string().optional(),
//       z.string().optional(),
//       z.string().optional(),
//     ]),
//     z.tuple([
//       z.literal('weekly'),
//       z.string().optional(),
//       z.string().optional(),
//     ]),
//     z.tuple([
//       z.literal('monthly'),
//       z.string().optional(),
//       z.string().optional(),
//     ]),
//   ])
//   .refine(
//     (value) => {
//       const [, minRate, maxRate] = value;
//       return !(minRate && !maxRate) || (!minRate && !maxRate);
//     },
//     {
//       message: 'Please enter Max rate',
//       path: [2],
//     },
//   )
//   .refine(
//     (value) => {
//       const [, minRate, maxRate] = value;
//       return !(!minRate && maxRate) || (!minRate && !maxRate);
//     },
//     {
//       message: 'Please enter Min rate',
//       path: [1],
//     },
//   )
//   .refine(
//     (value) => {
//       const [, minRate, maxRate] = value;
//       if (minRate && maxRate) {
//         return parseFloat(minRate) <= parseFloat(maxRate);
//       }
//       return true;
//     },
//     {
//       message: 'Max rate should be greater than Min rate',
//       path: [2],
//     },
//   );

// export const toolsSchema = z.object({
//   requiredSkills: z.array(z.string()).min(3),
//   jobTitle: z.string(),
//   jobDescription: z.string(),
//   languages: z.array(z.string()).min(1),
//   paymentOneTime: z.boolean(),
//   paymentOngoing: z.boolean(),
//   oneTime: z
//     .array(z.union([z.string(), z.number()]))
//     .length(4)
//     .refine((array) => !(array[0] && !array[1]) || (!array[0] && !array[1]), {
//       message: 'Please enter Max rate',
//       path: [1],
//     })
//     .refine((array) => !(!array[0] && array[1]) || (!array[0] && !array[1]), {
//       message: 'Please enter Min rate',
//       path: [0],
//     })
//     .refine((array) => array[1] >= array[0], {
//       message: 'Max rate should be greater than Min rate',
//       path: [1],
//     }),

//   ongoing: onSchema,
// });
