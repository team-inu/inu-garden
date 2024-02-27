'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import { toast } from 'sonner';
import * as xlsx from 'xlsx';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateStudentBulk } from '@/hooks/student-hook';
import {
  ApplicantSpreadsheetRow,
  FirstDataHeaderRow,
} from '@/libs/spreadsheet/applicant-spreadsheet';
import { EligibleSpreadsheetRow } from '@/libs/spreadsheet/eligible-spreadsheet';
import { CreateStudentPayload } from '@/types/schema/student-schema';

const MultipleFileUploader = () => {
  const [applicantFiles, setApplicantFiles] = useState<File[]>([]);
  const [eligibleFiles, setEligibleFiles] = useState<File[]>([]);

  const [logs, setLogs] = useState<number>(0);

  const [applicants, setApplicants] = useState<ApplicantSpreadsheetRow[]>([]);
  const [eligibles, setEligibles] = useState<EligibleSpreadsheetRow[]>([]);

  const { mutate, isPending: isSubmitting } = useCreateStudentBulk();

  const onApplicantFilesDrop = <T extends File>(
    acceptedFiles: T[],
    _fileRejections: FileRejection[],
    _event: DropEvent,
  ) => {
    const readFile = async (file: File) => {
      const buffer = await file.arrayBuffer();
      const workBook = xlsx.read(buffer, { type: 'buffer' });

      const sheet1 = workBook.Sheets[workBook.SheetNames[0]];

      const dataWithHeaders = xlsx.utils.sheet_to_json(sheet1, {
        range: 4,
        header: 1,
      });

      const headerFirstRow = dataWithHeaders[0] as string[];
      const headerSecondRow = dataWithHeaders[1] as string[];

      const indexByHeaderFirstRow = new Map<string, number>();
      const indexByHeaderSecondRow = new Map<string, number>();

      headerFirstRow.forEach((header, index) =>
        indexByHeaderFirstRow.set(header, index),
      );
      headerSecondRow.forEach((header, index) =>
        indexByHeaderSecondRow.set(header, index),
      );

      const rawData = dataWithHeaders.slice(2) as string[];

      const final: ApplicantSpreadsheetRow[] = rawData.map((row) => {
        const test = FirstDataHeaderRow.reduce((previousResult, header) => {
          return {
            ...previousResult,
            [header]:
              indexByHeaderFirstRow.get(header) === undefined
                ? ''
                : row[indexByHeaderFirstRow.get(header)!],
          };
        }, {});

        let secondRow = {};

        const indexScore = indexByHeaderFirstRow.get(
          'รายการคะแนนกลุ่มสาระวิชา',
        );
        if (indexScore === undefined) {
          secondRow = {
            รายการคะแนนกลุ่มสาระวิชา_คณิตศาสตร์: '',
            รายการคะแนนกลุ่มสาระวิชา_วิทยาศาสตร์: '',
            รายการคะแนนกลุ่มสาระวิชา_ภาษาต่างประเทศ: '',
          };
        } else {
          secondRow = {
            รายการคะแนนกลุ่มสาระวิชา_คณิตศาสตร์: row[indexScore],
            รายการคะแนนกลุ่มสาระวิชา_วิทยาศาสตร์: row[indexScore + 1],
            รายการคะแนนกลุ่มสาระวิชา_ภาษาต่างประเทศ: row[indexScore + 2],
          };
        }

        return {
          ...test,
          ...secondRow,
        } as ApplicantSpreadsheetRow;
      });

      setApplicants((prev) => [...prev, ...final]);
    };

    setApplicantFiles(acceptedFiles);

    const promises = acceptedFiles.map((file) => {
      const fileTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];
      if (!fileTypes.includes(file.type)) {
        return Promise.resolve();
      }
      return readFile(file);
    });

    Promise.all(promises).then(() => {
      toast.success('All files have been read');
    });
  };

  const onEligibleFilesDrop = <T extends File>(
    acceptedFiles: T[],
    _fileRejections: FileRejection[],
    _event: DropEvent,
  ) => {
    const readFile = async (file: File) => {
      const buffer = await file.arrayBuffer();
      const workBook = xlsx.read(buffer, { type: 'buffer' });

      workBook.SheetNames.map((sheetName) => {
        const sheet = workBook.Sheets[sheetName];
        const eligibles = xlsx.utils.sheet_to_json(sheet, {
          range: 1,
        }) as EligibleSpreadsheetRow[];
        setEligibles((prev) => [...prev, ...eligibles]);
      });
    };

    setEligibleFiles(acceptedFiles);

    const promises = acceptedFiles.map((file) => {
      if (file.type !== 'application/vnd.ms-excel') {
        return Promise.resolve();
      }
      return readFile(file);
    });

    Promise.all(promises).then(() => {
      toast.success('All files have been read');
    });
  };

  const exportFile = () => {
    type ExtendedEligible = EligibleSpreadsheetRow & { year: string };

    type ExtendedEligibleWithPartialyApplicant = ExtendedEligible &
      Partial<ApplicantSpreadsheetRow>;

    const extendedEligibleWithApplicantToPyaoResult = (
      e: ExtendedEligibleWithPartialyApplicant,
      programmeName: string,
    ): CreateStudentPayload => {
      let firstName;
      let lastName;
      if (e['ชื่อ(ไทย)'] !== undefined && e['ชื่อ(ไทย)'] !== '') {
        firstName = e['ชื่อ(ไทย)'];
        lastName = e['นามสกุล(ไทย)'];
      } else if (e['ชื่อ(อังกฤษ)'] !== undefined && e['ชื่อ(อังกฤษ)'] !== '') {
        firstName = e['ชื่อ(อังกฤษ)'];
        lastName = e['นามสกุล(อังกฤษ)'];
      } else {
        firstName = undefined;
        lastName = undefined;
      }

      // TODO: no allow undefined value
      return {
        kmuttId: e['รหัสนักศึกษา'],
        firstName: firstName ?? '-',
        lastName: lastName ?? '-',
        admission: e['ประเภทการเข้า'],
        email: e['อีเมล์'] ?? '-',
        gpax: parseFloat(e['GPAX'] ?? '0') ?? 0,
        mathGPA:
          parseFloat(e['รายการคะแนนกลุ่มสาระวิชา_คณิตศาสตร์'] ?? '0') ?? 0,
        engGPA:
          parseFloat(e['รายการคะแนนกลุ่มสาระวิชา_ภาษาต่างประเทศ'] ?? '0') ?? 0,
        sciGPA:
          parseFloat(e['รายการคะแนนกลุ่มสาระวิชา_วิทยาศาสตร์'] ?? '0') ?? 0,
        school: e['ชื่อสถานศึกษา'] ?? '-',
        city: e['จังหวัด'] ?? '-',
        year: e.year,
        programmeName: programmeName,
        departmentName: 'computer engineer',
        remark: e['หมายเหตุ'],
      };
    };

    const workBook = xlsx.utils.book_new();

    const applicantByName = new Map<string, ApplicantSpreadsheetRow>();
    const extendedEligibleWithPartialyApplicantByName = new Map<
      string,
      ExtendedEligibleWithPartialyApplicant
    >();

    for (const applicant of applicants) {
      let name;
      // if (applicant["สัญชาติ"] == "ไทย") {
      //   name = applicant["คำนำหน้านาม(ไทย)"] + applicant["ชื่อ(ไทย)"] + " " + applicant["นามสกุล(ไทย)"];
      // } else {
      //   name = applicant["คำนำหน้านาม(อังกฤษ)"] + applicant["ชื่อ(อังกฤษ)"] + " " + applicant["นามสกุล(อังกฤษ)"];
      // }

      const thaiFirstName = applicant['ชื่อ(ไทย)'];
      const engFirstName = applicant['ชื่อ(อังกฤษ)'];

      if (thaiFirstName !== undefined && thaiFirstName !== '') {
        name =
          applicant['คำนำหน้านาม(ไทย)'] +
          applicant['ชื่อ(ไทย)'] +
          ' ' +
          applicant['นามสกุล(ไทย)'];
      } else if (engFirstName !== undefined && engFirstName !== '') {
        name =
          applicant['คำนำหน้านาม(อังกฤษ)'] +
          applicant['ชื่อ(อังกฤษ)'] +
          ' ' +
          applicant['นามสกุล(อังกฤษ)'];
      } else {
        name = 'no name';
      }

      applicantByName.set(name, applicant);

      // if(applicant["โอนไปยังระบบทะเบียน"] == "ใช่" && applicant["สถานะการชำระเงินค่ายืนยันสิทธิ์"] == "ชำระเงินแล้ว") {
      //   applicantByName.set(name, applicant)
      // }
    }

    for (const eligible of eligibles) {
      const applicant = applicantByName.get(eligible['ชื่อ - สกุล']);
      if (!applicant) {
        const text = `${eligible['ชื่อ - สกุล']} ${eligible['รหัสนักศึกษา']} is not merged"`;
        setLogs((prev) => prev + 1);
      }

      const year = eligible['รหัสนักศึกษา'].substring(0, 2);

      const value: ExtendedEligibleWithPartialyApplicant = {
        ...applicant,
        ...{
          ...eligible,
          year,
        },
      };

      extendedEligibleWithPartialyApplicantByName.set(
        eligible['ชื่อ - สกุล'],
        value,
      );
    }

    const extendedEligibleWithPartialyApplicants = Array.from(
      extendedEligibleWithPartialyApplicantByName.values(),
    );

    const filteredArr = extendedEligibleWithPartialyApplicants.filter((o) =>
      o.hasOwnProperty('ประเภทการเข้า'),
    );
    const regStudents = filteredArr.filter((student) => {
      // return student["สาขาวิชาที่สมัคร"] === "วิศวกรรมคอมพิวเตอร์ - วศ.บ. 4 ปี"
      return student['รหัสนักศึกษา'].substring(7, 9) === '10';
    });

    const interStudents = filteredArr.filter((student) => {
      // return student["สาขาวิชาที่สมัคร"] === "วิศวกรรมคอมพิวเตอร์ (หลักสูตรนานาชาติ) - วศ.บ. 4 ปี"
      return student['รหัสนักศึกษา'].substring(7, 9) === '34';
    });

    const reg = regStudents.map((e: ExtendedEligibleWithPartialyApplicant) =>
      extendedEligibleWithApplicantToPyaoResult(e, 'regular'),
    );
    const inter = interStudents.map(
      (e: ExtendedEligibleWithPartialyApplicant) =>
        extendedEligibleWithApplicantToPyaoResult(e, 'international'),
    );

    const result = reg.concat(inter);
    mutate(result);
    // const regWorksheet = xlsx.utils.json_to_sheet(reg);
    // const interWorksheet = xlsx.utils.json_to_sheet(inter);

    // xlsx.utils.book_append_sheet(workBook, regWorksheet, 'reg');
    // xlsx.utils.book_append_sheet(workBook, interWorksheet, 'inter');

    // xlsx.writeFile(workBook, 'output.xlsx');
  };

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Import students</DialogTitle>
        <DialogDescription>
          Import students from spreadsheet files.
        </DialogDescription>
      </DialogHeader>
      <div className="container relative mx-auto space-y-3  bg-white/20 px-5 py-5 shadow-xl">
        <div className="space-y-3">
          <Dropzone onDrop={onApplicantFilesDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="flex cursor-pointer items-center justify-center bg-green-400 p-10"
                >
                  <input {...getInputProps()} />
                  <p className="font-mono">
                    Drag drop some files here, or click to select files
                    (Applicant student)
                  </p>
                </div>
              </section>
            )}
          </Dropzone>

          <Dropzone onDrop={onEligibleFilesDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="flex cursor-pointer items-center justify-center bg-pink-400 p-10"
                >
                  <input {...getInputProps()} />
                  <p className="font-mono">
                    Drag drop some files here, or click to select files
                    (Eligible student)
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="bg-white/20 px-10 py-3 font-mono ">
          {'Uplaoded applicant files'}
          <ul className="scrollbar-thumb-blue-900 scrollbar  scrollbar-track-white/10 h-32 overflow-y-auto ">
            {applicantFiles.map((file, i) => (
              <li key={i}>
                [{(file as any).path}] [{file.type}] {file.name} - {file.size}{' '}
                bytes
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/20 px-10 py-3 font-mono">
          {'Uploaded eligible files'}
          <ul className="scrollbar-thumb-blue-900 scrollbar  scrollbar-track-white/10 h-32 overflow-y-auto">
            {eligibleFiles.map((file, i) => (
              <li key={i}>
                [{(file as any).path}] [{file.type}] {file.name} - {file.size}{' '}
                bytes
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          variant="secondary"
          onClick={() => {
            setApplicantFiles([]);
            setEligibleFiles([]);
            setApplicants([]);
            setEligibles([]);
            setLogs(0);
          }}
        >
          Clear all uploaded file
        </Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" onClick={exportFile}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MultipleFileUploader;
