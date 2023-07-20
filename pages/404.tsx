import Masthead from "@components/layout/masthead/Masthead";
import Link from "next/link";

export default function Custom404() {
    return (
      <>
        <Masthead title="404" />

        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold">We can't find that page</h1>
            <p className="py-4">Sorry, the page you are looking for doesn't exist or has been moved.</p>
            <Link href="/" className="bg-primary-500 text-white px-6 py-3 rounded-lg mt-4 inline-block">Start Again</Link>
          </div>
        </div>
      </>
    )
  }