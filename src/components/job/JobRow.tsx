import { BaseRecord } from '@refinedev/core'
import Link from 'next/link';
import React from 'react'
import { FiDollarSign } from 'react-icons/fi';
import { IJob } from 'src/interfaces/interface'
import TimeAgo from 'timeago-react';

const JobRow: React.FC<IJob | BaseRecord> = ({ job }) => {
    
  return (
    <>
        <div className="job-row rounded-lg p-5 font-inter shadow-md mt-7 hover:bg-gray-50">
            <Link href={`/jobs/show/${job.id}`}>
                <div className="job-companyName text-sm font-semibold justify-between flex">
                    <div className="grow">{job.companyname}</div>
                    <div className="job-posted-on font-normal text-xs text-gray-500">
                        {job.created_at && <TimeAgo datetime={job.created_at} />}
                    </div>
                </div>
                <div className="job-position text-xl font-bold my-2">{job.positionname}</div>
                <div className="job-brief-info flex gap-3 mt-3">
                    {job.baseannualsalary && <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700"> <FiDollarSign /> <span>{job.baseannualsalary}</span></div>}
                    {job.experiencelevel && <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700"> <span>{job.experiencelevel}</span></div>}
                    {job.jobtype && <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700"> <span>{job.jobtype}</span></div>}
                    {job.joblocation && <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700"> <span>{job.joblocation}</span></div>}
                </div>
            </Link>
        </div>
    </>
  )
}

export default JobRow