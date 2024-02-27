import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/muti-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStrictForm } from '@/hooks/form-hook';
import { useGetPloList } from '@/hooks/plo-hook';
import { useGetPoList } from '@/hooks/po-hook';
import {
  CreateCloDefaultValues,
  CreateCloSchema,
  CreateCloType,
} from '@/types/schema/clo-shema';
import { OptionaType } from '@/types/schema/form-schema';
import { GetProgramLearningOutcomeResponse } from '@/types/schema/plo-schema';

type PloDialogProps = {
  onSubmit: (values: CreateCloType) => void;
  defaultValues?: CreateCloType;
};

const getSubPloOptions = (
  ploList: GetProgramLearningOutcomeResponse[] | undefined,
  ploId: string,
) =>
  ploList
    ?.find((plo) => plo.id === ploId)
    ?.subProgramLearningOutcomes.map(
      (subPlo): OptionaType => ({
        label: subPlo.descriptionThai,
        value: subPlo.id,
      }),
    ) as OptionaType[];

const CloAddDialog: React.FC<PloDialogProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { data: plolist } = useGetPloList();
  const { data: polist } = useGetPoList();

  const form = useStrictForm(
    CreateCloSchema,
    defaultValues ?? CreateCloDefaultValues,
  );

  const updatePlo = (ploId: string) => {
    form.setValue('programLearningOutcomeId', ploId);
    form.setValue(
      'subProgramLearningOutcomeId',
      getSubPloOptions(plolist, ploId),
    );
  };

  return (
    <div>
      <DialogContent className="min-w-[75%]">
        <DialogHeader>
          <DialogTitle>Add Course learning outcome</DialogTitle>
          <DialogDescription>
            Fill in the course learning outcome information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="expectedPassingStudentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Student %</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} type="number" min={0} max={100} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedScorePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Score %</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} type="number" min={0} max={100} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedPassingAssignmentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Assignment %</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="programOutcomeId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Program Outcome</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Program  outcome" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {polist &&
                        polist.map((po) => (
                          <SelectItem key={po.id} value={po.id}>
                            {po.code}-{po.name}
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
              name="programLearningOutcomeId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Program Learning Outcome</FormLabel>
                  <Select onValueChange={updatePlo} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-24">
                        <SelectValue
                          className="h-24"
                          placeholder="Select Program learning outcome"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plolist &&
                        plolist.map((plo) => (
                          <SelectItem key={plo.id} value={plo.id}>
                            {plo.code} - {plo.descriptionThai}
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
              name="subProgramLearningOutcomeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Program Learning Outcome</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      options={getSubPloOptions(
                        plolist,
                        form.getValues('programLearningOutcomeId'),
                      )}
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => form.reset()} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default CloAddDialog;
