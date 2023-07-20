import React, { useEffect, useMemo, useState } from "react";
import JobRow from "./JobRow";
import { useTable } from "@refinedev/core";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const FilterCheckbox: React.FC<{
  fieldLabel: string;
  fieldName: string;
  fieldValue: string;
  onChange: (e: any) => void;
}> = ({ fieldLabel, fieldName, onChange, fieldValue }) => {
  return (
    <>
      <label htmlFor={fieldName} className="flex items-center">
        <input
          type="checkbox"
          name={fieldName}
          id={fieldLabel.replace(" ", "").toLowerCase()}
          value={fieldValue}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span className="ml-2 text-lg font-normal text-gray-900 dark:text-gray-300">
          {fieldLabel}
        </span>
      </label>
    </>
  );
};

const Job: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{
    jobcategory: string[];
    jobtype: string[];
  }>({
    jobcategory: [],
    jobtype: [],
  });

  const {
    tableQueryResult,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    filters,
    setFilters,
    pageCount,
  } = useTable({
    resource: "jobs",
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc"
        }
      ]
    }
  });

  const jobs = tableQueryResult.data?.data ?? [];
  const hasNext = current < pageCount;
  const hasPrev = current > 1;

  useEffect(() => {
    console.log("[selectedOptions]", selectedOptions);
    
    if (selectedOptions.jobcategory.length) {
      setFilters([
          {
            field: "jobcategory",
            operator: "in",
            value: selectedOptions.jobcategory
          }
      ]);
    }

    if (selectedOptions.jobtype.length) {
      setFilters([
        {
          field: "jobtype",
          operator: "in",
          value: selectedOptions.jobtype,
        },
      ]);
    }
  }, [selectedOptions]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    const groupName = e.target.name;

    setSelectedOptions((prevSelectedOptions: any) => {
      const isChecked = e.target.checked;
      const updatedList = { ...prevSelectedOptions };

      if (isChecked) {
        updatedList[groupName] = [...updatedList[groupName], optionValue];
      } else {
        updatedList[groupName] = updatedList[groupName].filter(
          (item: string) => item !== optionValue
        );
      }

      return updatedList;
    });
  };

  return (
    <section className="latest-jobs">
      <div className="container mx-auto">
        <div className="flex two-columns">
          {/* Job listing */}
          <div className="job-column grow mr-10">
            <h2 className="text-3xl font-bold mb-8">Latest Jobs</h2>

            <div className="job-lists-wrapper">
              {/* {data && data.data.map(job => <JobList job={job} key={job.id} />)} */}
              {jobs && jobs.map((job) => <JobRow job={job} key={job.id} />)}
            </div>

            <div className="job-lists-pagination">
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <div className="flex justify-between w-full mt-5 items-center">
                    <button
                        onClick={() => setCurrent((prev) => prev - 1)}
                        disabled={!hasPrev}
                        className="bg-blue-600 text-white text-2xl w-10 h-10 rounded-md inline-flex items-center justify-center disabled:bg-gray-200"
                    >
                        <FiChevronLeft />
                    </button>
                    <div>
                        Page{" "}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </div>
                    <button
                        onClick={() => setCurrent((prev) => prev + 1)}
                        disabled={!hasNext}
                        className="bg-blue-600 text-white text-2xl w-10 h-10 rounded-md inline-flex items-center justify-center disabled:bg-gray-200"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </div>
            </div>

          </div>

          {/* Filters */}
          <aside className="job-filters w-full max-w-xs">
            <div className="flex bg-gray-50 p-5 rounded-sm border flex-col">
              <p className="text-xl font-semibold">Job Type</p>
              <div className="filters-wrap">
                <ul className="p-5 gap-y-2 flex flex-col">
                  <li>
                    <FilterCheckbox
                      fieldLabel="Full-time"
                      fieldName="jobtype"
                      fieldValue="Full-time"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <FilterCheckbox
                      fieldLabel="Part-time"
                      fieldName="jobtype"
                      fieldValue="Part-time"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <FilterCheckbox
                      fieldLabel="Internship"
                      fieldName="jobtype"
                      fieldValue="Internship"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <FilterCheckbox
                      fieldLabel="Contract"
                      fieldName="jobtype"
                      fieldValue="Contract"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                </ul>
              </div>

              <p className="text-xl font-semibold">Job Category</p>
              <div className="filters-wrap">
                <ul className="p-5 gap-y-2 flex flex-col">
                  <li>
                    <FilterCheckbox
                      fieldLabel="Full Stack Programming"
                      fieldName="jobcategory"
                      fieldValue="Full Stack Programming"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <FilterCheckbox
                      fieldLabel="Back-End Programming"
                      fieldName="jobcategory"
                      fieldValue="Back-End Programming"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <FilterCheckbox
                      fieldLabel="Front-End Programming"
                      fieldName="jobcategory"
                      fieldValue="Front-End Programming"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                  <li>
                    <FilterCheckbox
                      fieldLabel="Devops & Sysadmin"
                      fieldName="jobcategory"
                      fieldValue="Devops & Sysadmin"
                      onChange={handleCheckboxChange}
                    />
                  </li>
                </ul>
              </div>

              <p className="text-xl font-semibold">Preffered Location</p>
              <div className="filters-wrap">
                <select
                  name="joblocation"
                  id="joblocation"
                  onChange={(e) =>
                    setFilters([
                      {
                        field: "joblocation",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ])
                  }
                  className="h-10 border mt-1 rounded px-4 w-full bg-white"
                >
                  <option value="">---</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="Africa">Africa</option>
                  <option value="Australia">Australia</option>
                  <option value="South America">South America</option>
                  <option value="Worldwide">Worldwide</option>
                </select>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Job;
