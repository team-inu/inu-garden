import { ColumnDef } from '@tanstack/react-table';

import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CloColumn } from '@/types/schema/clo-shema';

const mockCLO = [
  {
    id: '01HG65WNM2H6NET91P8N61MQ8Z',
    code: 'CLO1',
    description: 'string',
    weight: 0,
    programOutcomeId: '-',
    expectedPassingAssignmentPercentage: 0,
    expectedScorePercentage: 0,
    expectedPassingStudentPercentage: 0,
    courseId: '1',
    status: 'string',
    programLearningOutcomeId: '1',
  },
];

const columns: ColumnDef<CloColumn>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="code" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('code')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
  },
];

const CourseLearningOutcomeHistory = () => {
  return (
    <div className="space-y-3">
      <div className="text-lg font-bold">Course learning outcome</div>
      <div>
        <CourseLearningOutcomeDataTable
          disablePagination
          disableToolbar
          columns={columns}
          data={mockCLO}
        />
      </div>
    </div>
  );
};

export default CourseLearningOutcomeHistory;
