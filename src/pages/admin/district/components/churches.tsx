import React from 'react'
import { BsDatabaseFillExclamation } from 'react-icons/bs'

export default function Churches() {
  return (
     <section className="font-poppins flex flex-col gap-3 justify-center items-center px-4 py-5 h-56">
          <BsDatabaseFillExclamation
            className="size-20 text-gray-300"
            aria-hidden="true"
          />
          <p className="font-medium text-center md:text-lg text-gray-400">
            No churches to display at the moment
          </p>
        </section>
  )
}
