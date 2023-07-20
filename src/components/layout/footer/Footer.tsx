import { RefineIcon, SupabaseIcon } from '@components/ui/Icons'
import Link from 'next/link'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <>
    <div className="border-t-2 mt-10">
            <div className="container mx-auto">
                <div className="flex py-5 justify-between">
                    <p className="builtby">
                        Built by <Link href="https://github.com/kunalvirk/" target='_blank' className="underline">kunalvirk</Link>
                    </p>
                    <p className="poweredby flex items-center gap-4">
                        Powered by <span className="refine-icon footer-icon"><RefineIcon /></span> | <span className="supabase-icon footer-icon"><SupabaseIcon /></span>
                    </p>
                </div>
            </div>
    </div>
    </>
  )
}

export default Footer