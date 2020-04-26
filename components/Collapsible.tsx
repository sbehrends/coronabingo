import classnames from 'classnames'
import React, { ChangeEvent, Fragment, ReactNode, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Props {
  children: ReactNode
  id: string
  label: string
}

export default function Collapsible({ children, id, label }: Props) {
  const [open, setOpen] = useState(false)

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.checked)
  }

  return (
    <Fragment>
      <label
        htmlFor={id}
        className={classnames([
          'bg-gray-200 cursor-pointer block rounded w-full',
          'focus-within:outline-none focus-within:shadow-outline',
          'duration-150 ease-in-out transition',
        ])}
      >
        <input
          id={id}
          type="checkbox"
          className="visually-hidden"
          onChange={onCheckboxChange}
        />
        <div className="flex items-center justify-between px-4 py-2">
          <span className="flex-auto mr-4">{label}</span>
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {open && (
          <div className="bg-gray-100 px-4 py-2 rounded-b">{children}</div>
        )}
      </label>
    </Fragment>
  )
}
