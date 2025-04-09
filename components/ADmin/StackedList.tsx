


import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { PropsWithChildren } from 'react'
import CRUDHeader from './CRUDHeader'
import Link from 'next/link'

const statuses = {


  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const projects = [

  {
    id: 1,
    name: 'Textbook 1',
    href: '/admin/products/edit/textbook-1',
    status: 'Complete',
    createdBy: 'John Doe',
    created: 'March 17, 2025',
    createdTime: '2023-05-05T00:00Z',
  },
  {
    id: 2,
    name: 'Textbook 2',
    href: '/admin/products/edit/textbook-2',
    status: 'Complete',
    createdBy: 'John Doe',
    created: 'March 17, 2025',
    createdTime: '2023-05-05T00:00Z',
  },
  {
    id: 3,
    name: 'Textbook 3',
    href: '/admin/products/edit/textbook-3',
    status: 'Complete',
    createdBy: 'John Doe',
    created: 'March 17, 2025',
    createdTime: '2023-05-05T00:00Z',
  },
  {
    id: 4,
    name: 'Textbook 4',
    href: '/admin/products/edit/textbook-4',
    status: 'Complete',
    createdBy: 'John Doe',
    created: 'March 17, 2025',
    createdTime: '2023-05-05T00:00Z',
  },
  {
    id: 5,
    name: 'Textbook 5',
    href: '/admin/products/edit/textbook-5',
    status: 'Complete',
    createdBy: 'John Doe',
    created: 'March 17, 2025',
    createdTime: '2023-05-05T00:00Z',
  },
  {
    id: 6,
    name: 'Textbook 6',
    href: '/admin/products/edit/textbook-6',
    status: 'Complete',
    createdBy: 'John Doe',
    created: 'March 17, 2025',
    createdTime: '2023-05-05T00:00Z',
  },
 
]

function classNames(...classes: string[] ) {
  return classes.filter(Boolean).join(' ')
}


type Props = {
    header: string
  }
export default function StackedList({header}:Props) {
  return (

    <div className="w-full ">
        <CRUDHeader header={header} />
         <ul role="list" className="divide-y divide-gray-100 w-full">
        {projects.map((project) => (
            <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                <p className="text-sm/6 font-semibold text-gray-900">{project.name}</p>
                {/* <p
                    className={classNames(
                    statuses[project.status],
                    'mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
                    )}
                >
                    {project.status}
                </p> */}
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                <p className="whitespace-nowrap">
                    Created on <time dateTime={project.createdTime}>{project.created}</time>
                </p>
                <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                    <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="truncate">Created by {project.createdBy}</p>
                </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
                <Link
                href={project.href}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                >
                Edit product<span className="sr-only">, {project.name}</span>
                </Link>
                <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </MenuButton>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <MenuItem>
                    <Link
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                        Move<span className="sr-only">, {project.name}</span>
                    </Link>
                    </MenuItem>
                    <MenuItem>
                    <a
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                        Delete<span className="sr-only">, {project.name}</span>
                    </a>
                    </MenuItem>
                </MenuItems>
                </Menu>
            </div>
            </li>
        ))}
        </ul>
    </div>
   
  )
}