/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
'use client'

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Cart from '../Cart/Cart'
import Logo from '../Logo/Logo'
import instagram from '../../../imgs/instagram.png'
import "./Navbar.css"
import { Link } from 'react-router-dom'
const navigation = {
  categories: [
    
    {
      id: 'men',
      name: 'PRODUCTOS',
      featured: [
        {
          name: 'Orfertas en Knu Skool',
          href: '#',
          imageSrc: 'https://dcdn.mitiendanube.com/stores/222/311/products/whatsapp-image-2024-06-15-at-18-43-34-1-2df21c6bce39106ca717184895179966-1024-1024.jpeg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Conocé las nuevas low travis',
          href: '#',
          imageSrc: 'https://acdn.mitiendanube.com/stores/002/801/569/products/diseno-sin-titulo-1-f60afb3361ebaed09c17023587555972-640-0.png',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Ver todo en Productos',
          href :" /categories",
          // category:[
          //  name2 = "Ver todo en Importados",
            
          // ],
          items: [
            { 
              name: 'Sneakers', 
              href: '/categories',
              models: [
                
                'Ver todo en sneakers',
                'Hombres',
                'Mujeres',
                
              ] 
            },
            // { 
            //   name: 'New Balance', 
            //   href: '#',
            //   models: [
                
            //     '574',
            //     '990v5',
            //     '327',
            //     '550',
            //     '997H'
            //   ] 
            // },
            // { 
            //   name: 'Adidas', 
            //   href: '#',
            //   models: [
                
            //     'Ultraboost',
            //     'Superstar',
            //     'Stan Smith',
            //     'NMD_R1',
            //     'ZX 2K Boost'
            //   ] 
            // },
            // { 
            //   name: 'Puma', 
            //   href: '#',
            //   models: [
                
            //     'RS-X',
            //     'Cali',
            //     'Future Rider',
            //     'Suede Classic',
            //     'Cell Alien'
            //   ] 
            // },
            // { 
            //   name: 'Vans', 
            //   href: '#',
            //   models: [
                
            //     'Knu Classic',
            //     'Old Skool',
            //     'Sk8-Hi',
            //     'Authentic',
            //     'Era',
            //     'Slip-On'
            //   ] 
            // },
          ],
        },
       
      ],
    },
  ],
  pages: [
    { name: 'INICIO', href: '/' },
    { name: 'CONTACTANOS', href: '#' },
  ],
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };
    return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-100 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base climate-crisis text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                   <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                          </div>
                          <Link to="/categories">
                          <a href={item.href} className="mt-6 block climate-crisis text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1 montserrat">
                            Shop now
                          </p>
                          </Link>
                        </div>
                      ))}
                    </div> 
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="climate-crisis text-custom-blue">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
       {/* <Link></Link>                */}
      
      {section.items.map((item) => (
        
        <li key={item.name} className="flow-root">
          <div className="accordion-group" data-accordion="default-accordion">
            <div
              className="group accordion px-1   transition-all duration-500  accordion-active:bg-indigo-50"
              id={`heading-${item.name}`}
            >
              <button
                onClick={() => toggleAccordion(item.name)}
                className="accordion-toggle group inline-flex items-center justify-between text-left leading-8 text-gray-900 w-full transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600"
                aria-controls={`collapse-${item.name}`}
              >
                <h3 className='montserrat'>{item.name}</h3>
                <svg
                  className={`text-gray-400 transition duration-500 w-6 h-6 group-hover:text-indigo-600 accordion-active:text-indigo-600 ${openAccordion === item.name ? 'rotate-90' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                id={`collapse-${item.name}`}
                className={`accordion-content w-full px-0 overflow-hidden transition-all duration-500 ${openAccordion === item.name ? 'max-h-96' : 'max-h-0'}`}
                aria-labelledby={`heading-${item.name}`}
              >
                <div className="text-gray-900 my-4 leading-6">
                  <ul className="list-none space-y-2">
                    {item.models.map((model, index) => (
                      <li className='montserrat my-3' key={index}>{model}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 montserrat text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

          
            <div className="border-t border-gray-200 px-4 py-6">
              <p className='climate-crisis uppercase text-xs mb-4'> Seguinos!</p>
              <a href="https://www.instagram.com/grav.sneakers/" target='_blank' className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src={instagram}
                  className="block h-auto w-7 flex-shrink-0"
                />
                
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
      <div className="overflow-hidden bg-custom-blue">
  <div className="whitespace-nowrap animate-marquee flex">
    <p className="flex h-10 items-center justify-center px-4 text-sm montserrat text-white sm:px-6 lg:px-8">
      Superando la compra de dos productos en el carrito tenes un -20%!
    </p>
    <p className="flex h-10 items-center justify-center px-4 text-sm montserrat text-white sm:px-6 lg:px-8">
      Superando la compra de dos productos en el carrito tenes un -20%!
    </p>
    <p className="flex h-10 items-center justify-center px-4 text-sm montserrat text-white sm:px-6 lg:px-8">
      Superando la compra de dos productos en el carrito tenes un -20%!
    </p>
  </div>
</div>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-28 flex lg:ml-0">
                <a className='' href="#">
                 
                 <Logo/>
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
  <div className="flex h-full space-x-8">
    {navigation.categories.map((category) => (
      <Popover key={category.name} className="flex">
        <div className="relative flex">
          <PopoverButton className="relative z-100 -mb-px flex items-center border-b-2 border-transparent pt-px text-xs climate-crisis text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
            {category.name}
          </PopoverButton>
        </div>

        <PopoverPanel
          transition
          className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

          <div className="relative bg-white z-10000">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-base sm:text-sm">
                  <div className="relative bg-white p-4">
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-white">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                    <a href={item.href} className="mt-6 block text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.name}
                    </a>
                    <p className="mt-1 text-gray-500">Shop now</p>
                  </div>
                  </div>
                  ))}
                </div>

                {/* Aquí ajustamos la disposición de las secciones y los ítems */}
                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                  {category.sections.map((section) => (
                    <div key={section.name} className="flex flex-col">
                      <p id={`${section.name}-heading`} className="climate-crisis text-gray-900">
                        {section.name}
                      </p>
                      <ul
                        role="list"
                        aria-labelledby={`${section.name}-heading`}
                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                      >
                        {section.items.map((item) => (
                          <li key={item.name} className="flex">
                            <a href={item.href} className="hover:text-gray-800 montserrat">
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    ))}

    {navigation.pages.map((page) => (
      <a
        key={page.name}
        href={page.href}
        className="flex items-center text-xs climate-crisis text-gray-700 hover:text-gray-800"
      >
        {page.name}
      </a>
    ))}
  </div>
</PopoverGroup>


              <div className="ml-auto flex items-center">
            

           

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                  </a>
                </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Cart/>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
