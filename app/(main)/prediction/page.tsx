'use client';

import { Fireworks, FireworksHandlers } from '@fireworks-js/react';
import { motion } from 'framer-motion';
import { Check, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStrictForm } from '@/hooks/form-hook';
import { usePredictGrade } from '@/hooks/prediction-hook';
import { useGetProgrammeList } from '@/hooks/programme-hook';
import {
  useGetAdmissions,
  useGetSchools,
  useGetStudentById,
} from '@/hooks/student-hook';
import { cn } from '@/libs/utils';
import {
  PredictGradeForm,
  PredictGradeFormSchema,
  PredictGradeRequestDefaultValue,
} from '@/types/schema/prediction-schema';

const PredictionPage = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const { data: programmes } = useGetProgrammeList();
  const { data: schoolList } = useGetSchools();
  const { data: admissionList } = useGetAdmissions();
  const { data } = useGetStudentById(result);

  const {
    mutate: predictGrade,
    data: gradeResult,
    isSuccess,
  } = usePredictGrade();
  const onSubmit = (value: PredictGradeForm) => {
    predictGrade(value);
  };
  const form = useStrictForm(
    PredictGradeFormSchema,
    PredictGradeRequestDefaultValue,
  );
  const ref = useRef<FireworksHandlers>(null);

  const admissionsOptions = admissionList?.admissions?.map((admission) => ({
    label: admission,
    value: admission,
  }));

  const schoolsOptions = schoolList?.schools?.map((school) => ({
    label: school,
    value: school,
  }));

  const useGetStudent = () => {
    if (!studentId) return;
    setResult(studentId);
  };

  useEffect(() => {
    ref.current?.stop();
    if (isSuccess) {
      ref.current?.start();
    }
    if (data) {
      form.reset({
        programmeName: data.programmeName,
        gpax: data.GPAX,
        mathGPA: data.mathGPA,
        engGPA: data.engGPA,
        sciGPA: data.sciGPA,
        school: data.school,
        admission: data.admission,
      });
    }
  }, [data, form, isSuccess]);

  return (
    <div className="relative mt-10 flex  flex-col items-center  space-y-3 overflow-hidden">
      <Fireworks
        ref={ref}
        options={{
          opacity: 0.5,
          explosion: 5,
          intensity: 30,
          particles: 50,
          acceleration: 1.05,
        }}
        style={{
          bottom: 0,
          right: 0,
          width: '100%',
          height: '400px',
          position: 'fixed',
          background: 'transparent',
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'anticipate', duration: 0.5 }}
        className=" text-3xl font-bold"
      >
        Predict
        <span className="text-primary"> grade</span> for student
      </motion.div>
      {/* description */}
      <div className="text-lg font-bold text-input">
        For each student, predict the score they will get .
      </div>
      {/* <button onClick={() => toggle()}>Toggle</button> */}
      <div>
        <div className="space-y-2">
          <div>
            It old student?{' '}
            <span>
              please enter <span className="text-primary">student ID</span> to
              predict the grade for you.
            </span>
          </div>
          <div className="flex gap-3">
            <Input
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
            />
            <Button onClick={useGetStudent}>Get</Button>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container mx-auto grid w-full grid-cols-4 items-end gap-5"
        >
          <FormField
            control={form.control}
            name="programmeName"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Programme</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a programme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programmes?.map((e) => (
                      <SelectItem value={e.name} key={e.name}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gpax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPAX</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-3">
                    <Input {...field} type="number" />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="engGPA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eng GPA</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-3">
                    <Input {...field} type="number" />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mathGPA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Math GPA</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-3">
                    <Input {...field} type="number" />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sciGPA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sci GPA</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-3">
                    <Input {...field} type="number" />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>schools</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          ' justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value && schoolsOptions
                          ? schoolsOptions.find(
                              (student) => student.value === field.value,
                            )?.label
                          : 'Select admission'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command className="">
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup className="max-h-96 overflow-auto scrollbar  scrollbar-thumb-primary">
                        {schoolsOptions &&
                          schoolsOptions.map((school) => (
                            <CommandItem
                              value={school.label}
                              key={school.value}
                              onSelect={() => {
                                form.setValue('school', school.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  school.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {school.label}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="admission"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>รอบการผ่านคัดเลือก</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          ' justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value && admissionsOptions
                          ? admissionsOptions.find(
                              (student) => student.value === field.value,
                            )?.label
                          : 'Select admission'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup className="max-h-96 overflow-auto scrollbar  scrollbar-thumb-primary">
                        {admissionsOptions &&
                          admissionsOptions.map((student) => (
                            <CommandItem
                              value={student.label}
                              key={student.value}
                              onSelect={() => {
                                form.setValue('admission', student.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  student.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {student.label}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="container w-full border-t-4 border-foreground/50 py-5"></div>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">Result</div>
          <div className="text-lg font-bold text-input">
            The server will predict the grade for you, please wait a moment.
          </div>
        </div>

        {gradeResult ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'anticipate', duration: 0.5 }}
            className="text-3xl font-bold"
          >
            {gradeResult.predictedGPAX}
          </motion.div>
        ) : (
          <Image
            src="/images/inu_sleep.png"
            width={250}
            height={250}
            alt="inu_sleep"
            className="animate-pulse"
          />
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
