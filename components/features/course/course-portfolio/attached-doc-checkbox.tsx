import { Checkbox } from '@/components/ui/checkbox';

type AttachedDocumentCheckboxProps = {
  lable: string;
};

const AttachedDocumentCheckbox: React.FC<AttachedDocumentCheckboxProps> = ({
  lable,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {lable}
      </label>
    </div>
  );
};

export default AttachedDocumentCheckbox;
