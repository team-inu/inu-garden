import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type GradeTableProps = {
  gradeData: {
    grade: string;
    gradeScore: string;
    studentAmount: string;
  }[];
};

const GradeTable: React.FC<GradeTableProps> = ({ gradeData }) => {
  return (
    <Table>
      <TableCaption>Grade of students</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={3}>Number of student</TableHead>
          <TableHead colSpan={3}> 98</TableHead>
        </TableRow>
        <TableRow>
          <TableHead colSpan={3}>GPA</TableHead>
          <TableHead colSpan={3}>2.93</TableHead>
        </TableRow>
        <TableRow>
          <TableHead colSpan={2}>Grade</TableHead>
          <TableHead colSpan={2}>Grade score</TableHead>
          <TableHead colSpan={2}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gradeData.map((invoice) => (
          <TableRow key={invoice.grade}>
            <TableCell colSpan={2} className="font-medium">
              {invoice.grade}
            </TableCell>
            <TableCell colSpan={2}>
              {`>`}
              {invoice.gradeScore}
            </TableCell>
            <TableCell colSpan={2} className="text-right">
              {invoice.studentAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GradeTable;
