import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    grade: 'A',
    gradeScore: '82',
    studentAmount: '10',
  },
  {
    grade: 'B+',
    gradeScore: '75',
    studentAmount: '25',
  },
  {
    grade: 'B',
    gradeScore: '68',
    studentAmount: '13',
  },
  {
    grade: 'C+',
    gradeScore: '61',
    studentAmount: '17',
  },
  {
    grade: 'C',
    gradeScore: '54',
    studentAmount: '5',
  },
  {
    grade: 'D+',
    gradeScore: '47',
    studentAmount: '3',
  },
  {
    grade: 'D',
    gradeScore: '40',
    studentAmount: '2',
  },
  {
    grade: 'F',
    gradeScore: '0',
    studentAmount: '0',
  },
];

export function GradeTable() {
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
        {invoices.map((invoice) => (
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
}
