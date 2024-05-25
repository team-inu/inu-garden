'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { columns } from '@/components/features/course/enrollment/enrollment-clo-column';
import { EnrollmentDataTable } from '@/components/features/course/enrollment/enrollment-table';
import { cloColumn } from '@/components/features/course/outcome/clo-column';
import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import Loading from '@/components/features/loading-screen';
import { subPloStaticColumn } from '@/components/features/tabee/sub-plo/sub-plo-static-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { useGetCloByCourseId, useGetCloById } from '@/hooks/clo-hook';
import { useGetCloAndPassingCourseLearningOutcome } from '@/hooks/course-portfolio-hook';
import { EnrollmentCloColumn } from '@/types/schema/enrollment-schema';

const CourseLearningOutcome = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [selectedRows, setSelectedRows] = useState({
    id: '',
    code: '',
  });
  const getVales = (id: string, code: string) => {
    setSelectedRows({ id, code });
    router.push(`${pathName}/?cloId=${id}&tab=outcome`, { scroll: false });
    setTimeout(() => {
      subPloTableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const { id: courseId } = useParams<{ id: string }>();

  const { data: clos, isLoading } = useGetCloByCourseId(courseId);
  const { data: clo, isLoading: isCloLoading } = useGetCloById(selectedRows.id);
  const { data: passStudents } = useGetCloAndPassingCourseLearningOutcome(courseId);

  const subPloTableRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <h1 className="mb-5 text-2xl font-bold">Course learning outcome</h1>{' '}
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <CourseLearningOutcomeDataTable columns={cloColumn} data={clos ?? []} getValues={getVales} />
        )}
      </div>
      <div>
        {selectedRows.id && (
          <div>
            <h1 className="mb-5 text-2xl font-bold " ref={subPloTableRef}>
              Sub program learning outcome of CLO:{selectedRows.code}
            </h1>
            {isCloLoading ? (
              <Loading />
            ) : (
              <>
                <SubProgramLearningOutcomeDataTable
                  columns={subPloStaticColumn}
                  data={clo?.subProgramLearningOutcomes ?? []}
                  subPloId={clo?.subProgramLearningOutcomes.map((subPlo) => subPlo.id) ?? []}
                  isTabee={false}
                />
              </>
            )}
          </div>
        )}
        {selectedRows.id && (
          <div>
            <h1 className="mb-5 text-2xl font-bold ">Students status of CLO:{selectedRows.code}</h1>
            <EnrollmentDataTable
              outcomeData={[]}
              columns={columns}
              data={
                ((passStudents &&
                  passStudents.find((data) => data.courseLearningOutcomeId === selectedRows.id)
                    ?.students) as unknown as EnrollmentCloColumn[]) ?? []
              }
              isCreateEnabled={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CourseLearningOutcome;
