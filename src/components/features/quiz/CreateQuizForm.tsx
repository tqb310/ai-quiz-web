'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { quizCreationSchema } from '@/schemas/form/quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Props = {};

type QuizCreationType = z.infer<typeof quizCreationSchema>;

const CreateQuizForm = (props: Props) => {
  const form = useForm<QuizCreationType>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: '',
      type: 'mcq',
      amount: 1,
    },
  });

  const onSubmit = (data: QuizCreationType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a topic"
                  className="focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide a topic for the quiz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter an amount"
                  className="focus-visible:ring-0"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>
                Please provide an amount of questions you
                want to answer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="mcq"
                      id="mcq"
                      className=" peer"
                    />
                    <Label
                      htmlFor="mcq"
                      className="cursor-pointer peer-[data-state='checked']:bg-pink-500"
                    >
                      Multiple Choice
                    </Label>
                    <RadioGroupItem
                      value="open_ended"
                      id="open_ended"
                      className=" peer"
                    />
                    <Label
                      htmlFor="open_ended"
                      className="cursor-pointer peer-[data-state='checked']:bg-primary"
                    >
                      Open-Ended
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Please provide an amount of questions you
                want to answer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Quiz
        </Button>
      </form>
    </Form>
  );
};

export default CreateQuizForm;
