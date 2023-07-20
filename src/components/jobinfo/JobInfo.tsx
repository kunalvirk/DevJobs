import React, { useEffect, useState } from 'react'

const JobInfo: React.FC<{ title: string, content: string }> = ({ title, content }) => {
  return (
    <div className={`job-info-section mb-5`}>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <div className="job-description-holder" dangerouslySetInnerHTML={{
                __html: content
            }}/>
    </div>
  )
}

export default JobInfo