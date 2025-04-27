'use client'

import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface AccordionProps {
  title: string
  content: string
  className?: string
}

export default function Accordion({ title, content, className = '' }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-medium">{title}</h3>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  )
}
