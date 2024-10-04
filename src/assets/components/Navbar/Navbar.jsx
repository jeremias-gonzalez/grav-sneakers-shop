

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
import instagram from '/public/imgs/instagram.png'
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
          href: "/categories",
          items: [
            { 
              name: 'Sneakers', 
              href: '/categories',
              models: [
                { name: 'Ver todo en sneakers', href: '/categories' },
                { name: 'Hombres', href: '/categories' },
                { name: 'Mujeres', href: '/categories' },
              ] 
            },
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
      <div className="sticky top-0 z-50 bg-white">
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
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base climate-crisis text-gray-900 data-[selected]:border-custom-blue data-[selected]:text-indigo-600"
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
                          <Link to={item.href}>
                            <span className="mt-6 block climate-crisis text-gray-900">
                              <span aria-hidden="true" className="absolute inset-0 z-10" />
                              {item.name}
                            </span>
                          </Link>
                          <p aria-hidden="true" className="mt-1 montserrat">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-kelsi text-custom-blue">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <div className="accordion-group" data-accordion="default-accordion">
                                <div
                                  className="group accordion px-1 transition-all duration-500 accordion-active:bg-indigo-50"
                                  id={`heading-${item.name}`}
                                >
                                  <button
                                    onClick={() => toggleAccordion(item.name)}
                                    className="accordion-toggle group inline-flex items-center justify-between text-left leading-8 text-gray-900 w-full transition duration-500 group-hover:text-custom-blue accordion-active:text-custom-blue"
                                    aria-controls={`collapse-${item.name}`}
                                  >
                                    <h3 className='montserrat'>{item.name}</h3>
                                    <svg
                                      className={`text-gray-400 transition duration-500 w-6 h-6 group-hover:text-custom-blue accordion-active:text-custom-blue ${openAccordion === item.name ? 'rotate-90' : ''}`}
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
                                        {item.models.map((model) => (
                                          <li className='montserrat my-3' key={model.name}>
                                            <Link to={model.href} className="hover:text-indigo-600">{model.name}</Link>
                                          </li>
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
                  <Link to={page.href} className="-m-2 block p-2 montserrat text-gray-900">
                    {page.name}
                  </Link>
                </div>
              ))}
              <div className="flow-root">
                <Link to="/cart" className="-m-2 block p-2 montserrat text-gray-900">
                  Carrito
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="  relative bg-white">
      <div className="overflow-hidden bg-custom-blue">
  <div className="whitespace-nowrap animate-marquee flex">
    <p className="flex h-10 items-center justify-center px-4 text-sm montserrat text-white sm:px-6 lg:px-8">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path fill-rule="evenodd" d="M 6.40625 16.800781 C 3.152344 20.621094 0 25.234375 0 28.902344 C 0 31.019531 1.78125 33.996094 6.132813 33.996094 C 8.484375 33.996094 10.820313 33.050781 12.648438 32.320313 C 15.730469 31.085938 49.789063 16.296875 49.789063 16.296875 C 50.117188 16.132813 50.058594 15.925781 49.644531 16.027344 C 49.480469 16.070313 12.566406 26.074219 12.566406 26.074219 C 11.855469 26.273438 11.128906 26.382813 10.421875 26.382813 C 7.230469 26.382813 5.078125 24.851563 5.078125 21.503906 C 5.078125 20.207031 5.484375 18.640625 6.40625 16.800781 Z"></path>
</svg>
    </p>
    <p className="flex h-10 items-center justify-center px-4 text-sm montserrat text-white sm:px-6 lg:px-8">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path d="M 24.78125 6.03125 L 24.0625 6.875 C 20.046875 11.457031 18.09375 18.789063 18.34375 26.03125 L 18.375 26.71875 L 17.46875 25.4375 C 13.789063 19.910156 8.210938 16.9375 1.1875 15.6875 L -0.125 15.4375 L 0 16.78125 C 0.378906 20.46875 1.179688 23.472656 2.4375 26.375 L 2.6875 27 L 3.34375 27 L 16.65625 26.96875 L 18.375 26.96875 L 18.375 27 L 47.125 27 L 47.375 26.40625 C 48.699219 23.527344 49.554688 20.417969 50 16.8125 L 50.15625 15.5 L 48.84375 15.71875 C 41.683594 16.804688 35.996094 19.917969 32.09375 25.40625 L 31.25 26.59375 L 31.28125 26.0625 C 31.632813 18.671875 29.621094 11.320313 25.53125 6.84375 Z M 24.8125 9.3125 C 27.703125 13.121094 29.355469 18.917969 29.25 25 L 20.375 25 C 20.347656 19.042969 21.96875 13.203125 24.8125 9.3125 Z M 2.25 18.03125 C 7.421875 19.175781 11.492188 21.347656 14.5 24.96875 L 4.0625 25 C 3.195313 22.875 2.621094 20.601563 2.25 18.03125 Z M 47.71875 18.03125 C 47.300781 20.582031 46.695313 22.894531 45.78125 25 L 35.125 25 C 38.304688 21.335938 42.457031 19.082031 47.71875 18.03125 Z M 3.5 29.5625 C 3.878906 30.386719 4.5 31.417969 5.03125 32.15625 L 44.6875 32.125 C 45.265625 31.316406 45.820313 30.484375 46.21875 29.5625 Z M 6.875 34.78125 C 7.695313 35.867188 8.414063 36.308594 9.4375 37.125 L 40.125 37.125 C 40.988281 36.453125 41.886719 35.660156 42.6875 34.78125 Z M 12.6875 39.28125 C 15.308594 40.902344 18.382813 41.964844 21.875 42.6875 L 21.46875 39.28125 Z M 22.3125 39.28125 C 22.988281 40.6875 23.859375 41.867188 24.84375 43 C 25.8125 41.847656 26.472656 40.667969 27.15625 39.28125 Z M 28.15625 39.28125 L 27.625 42.5 C 31.132813 41.855469 34.222656 40.835938 36.90625 39.28125 Z"></path>
</svg>
    </p>
    <p className="flex h-10 items-center justify-center px-4 text-sm montserrat text-white sm:px-6 lg:px-8">
 <svg width="64px" height="64px" viewBox="0 0 192.76 192.76" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path fill="#5a9a77" d="M0 0h192.756v192.756H0V0z"></path> <path d="M80.323 92.735l-21.51.766 20.424 1.135 1.086-1.901zM77.75 97.255l-21.561.767 20.5 1.139 1.061-1.906zM75.177 101.813l-21.534.756 20.475 1.138 1.059-1.894zM72.657 106.348l-21.561.768 20.451 1.136 1.11-1.904zM99.014 69.92l-27.454.977 27.532 1.53-.078-2.507zM98.84 65.434l-24.663.865 24.741 1.419-.078-2.284zM98.664 61.107l-21.974.723 22.08 1.226-.106-1.949zM98.516 56.665l-19.261.644 19.337 1.142-.076-1.786zM98.391 53.074H81.639l16.777.89-.025-.89zM70.059 110.881l-21.509.779h21.07l.439-.779z"></path> <path d="M142.953 53.219h-30.998l-.879 1.556 15.512.823c.182 0 .182.258-.078.258l-16.338.546-1.576 2.758 15.406.91c.207.026.156.31-.025.31l-16.365.538-1.523 2.641 15.381.854c.336.026.336.311 0 .311l-16.338.573-1.551 2.762 15.33.879c.336.026.311.336 0 .336l-16.338.582-1.578 2.728 15.355.853c.232.026.26.311-.051.311l-47.077 1.577 44.673 2.482c.283 0 .258.362-.053.362L66.689 79.85l44.673 2.481c.207 0 .258.336-.053.336l-47.231 1.706 44.673 2.482c.182.026.361.362-.025.388L61.57 88.921l44.672 2.481c.129.026.258.362-.051.362l-23.733.846.078 2.142 21.147 1.175c.154.026.232.336-.053.336l-21.016.747.103 2.396 18.356 1.02c.18.026.258.388-.053.388l-18.2.639.079 2.629 15.641.869c.18.025.232.361-.078.361l-15.485.553.103 2.892 12.926.718c.182.026.182.337-.077.337l-12.797.463.052 1.243h41.726c11.064 0 20.99-8.066 22.852-14.478 1.863-6.411 1.863-12.202-7.031-15.097 4.965-1.138 13.598-6.737 15.305-14.478 1.548-7.033-1.036-14.22-13.083-14.246zm-20.988 44.9h-12.822l7.238-12.823h9.514c9.824 0 5.066 12.823-3.93 12.823zm16.596-27.509c-.414 1.551-3.518 5.481-7.445 5.481h-9.514l6.1-10.754h4.861c6.203.207 6.41 3.723 5.998 5.273zM189.922 130.099c0-4.969-4.131-9.131-9.1-9.131-5.098 0-9.26 4.228-9.26 9.422a9.253 9.253 0 0 0 9.293 9.292c3.773 0 7.355-2.581 8.42-6.098h-4.711c-.936 1.484-2.16 2.161-3.84 2.161-2.129 0-4.031-1.452-4.645-3.517h13.615c.163-.999.228-1.484.228-2.129zm-13.971-1.244c.613-2.42 2.549-3.969 4.936-3.969 2.389 0 4.26 1.517 4.84 3.969h-9.776zM128.756 121.829v1.449c-1.354-1.452-3.316-2.278-5.414-2.278-4.646 0-8.607 3.968-8.607 9.131 0 4.871 3.504 9.24 8.699 9.24 2.291 0 4.033-.529 5.678-2.4v2.291h3.938v-17.433h-4.294zm-4.809 13.847a5.41 5.41 0 1 1 0-10.821 5.41 5.41 0 0 1 0 10.821zM11.417 120.967c-1.774 0-3.129.613-4.614 2.13v-1.71H2.834v17.875h4.292v-8.422c0-2.29.193-5.937 3.355-5.937 2.968 0 3.291 3.42 3.291 5.614v8.744h4.291v-9.583c0-2.517-.193-3.71-.871-5.13-1-2.129-3.355-3.581-5.775-3.581zM38.081 130.099c0-4.969-4.13-9.131-9.099-9.131-5.098 0-9.26 4.228-9.26 9.422a9.254 9.254 0 0 0 9.292 9.292c3.775 0 7.356-2.581 8.421-6.098h-4.71c-.936 1.484-2.162 2.161-3.84 2.161-2.129 0-4.033-1.452-4.646-3.517h13.615c.163-.999.227-1.484.227-2.129zm-13.97-1.244c.613-2.42 2.549-3.969 4.937-3.969s4.259 1.517 4.84 3.969h-9.777zM108.686 139.247h4.291v-23.844h-4.291v23.844zM144.371 120.967c-1.775 0-3.131.613-4.615 2.13v-1.71h-3.969v17.875h4.293v-8.422c0-2.29.193-5.937 3.355-5.937 2.967 0 3.291 3.42 3.291 5.614v8.744h4.291v-9.583c0-2.517-.193-3.71-.871-5.13-1-2.129-3.355-3.581-5.775-3.581zM161.729 124.904c1.967 0 3.096.646 4.162 2.452h4.838c-1.322-3.839-4.709-6.389-8.84-6.389-5.227 0-9.422 4.162-9.422 9.293 0 5.162 4.227 9.421 9.422 9.421a9.579 9.579 0 0 0 7.033-3.13c.904-1 1.227-1.581 1.807-3.161h-4.838c-1.002 1.548-2.291 2.354-3.904 2.354-3.002 0-5.227-2.323-5.227-5.421 0-3.128 2.129-5.419 4.969-5.419zM54.483 132.293l-3.039-10.905h-3.453l-3.072 10.905-3.633-10.905H37.5l5.968 17.874h2.749l3.485-11.582 3.387 11.582h2.885l5.723-17.874h-3.548l-3.666 10.905zM77.474 120.986c-2.097 0-4.059.826-5.414 2.277v-7.859h-4.292v23.843h3.936v-2.29c1.646 1.871 3.388 2.399 5.679 2.399 5.195 0 8.699-4.368 8.699-9.24.001-5.162-3.961-9.13-8.608-9.13zm-.605 14.69a5.41 5.41 0 1 1 0-10.821 5.41 5.41 0 0 1 0 10.821zM101.527 121.829v1.449c-1.355-1.452-3.316-2.278-5.414-2.278-4.646 0-8.609 3.968-8.609 9.131 0 4.871 3.505 9.24 8.699 9.24 2.291 0 4.033-.529 5.679-2.4v2.291h3.936v-17.433h-4.291zm-4.808 13.847a5.41 5.41 0 1 1 0-10.821 5.41 5.41 0 0 1 0 10.821z"></path> </g> </g></svg>
   </p>
   <p className='flex h-10 items-center justify-center px-4 text-sm montserrat text-white sm:px-6 lg:px-8'>
  <svg fill="#000000" viewBox="-88.93 -88.93 1067.16 1067.16" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-88.93" y="-88.93" width="1067.16" height="1067.16" rx="0" fill="#5a9a77" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m512.857 36.99c-2.898.447-5.684 11.118-11.285 16.677-4.096 4.012-9.209 3.761-11.925 8.721-1.031 1.853-.697 5.016-1.867 8.053-2.285 6.074-10.337 6.617-10.337 13.235-.028 7.147 6.715 8.512 12.552 13.583 4.556 4.082 5.002 6.896 10.518 8.874 4.71 1.603 11.717-3.636 18.028-1.755 5.183 1.547 10.142 2.661 11.313 7.983 1.03 4.904-.07 12.51-6.353 11.633-2.118-.237-11.299-3.33-22.583-2.132-13.612 1.547-29.146 5.99-30.664 21.163-.836 8.484 9.654 18.487 19.783 16.453 7.007-1.38 3.692-9.64 7.509-13.653 5.001-5.14 33.338 17.944 59.683 17.944 11.09 0 19.337-2.8 27.53-11.382.765-.655 1.699-2.062 2.883-2.146 1.115.084 3.065 1.184 3.706 1.658 21.218 17.052 37.253 51.255 115.229 51.659 10.964.055 23.46 5.294 33.658 14.6 9.098 8.415 14.42 21.496 19.588 34.773 7.802 19.923 21.79 39.302 42.993 60.868 1.157 1.156 18.613 14.726 20.006 15.743.223.139 1.505 3.204 1.06 4.917-.516 12.929-2.397 50.53 25.633 52.23 6.855.348 5.057-4.472 5.057-7.788-.013-6.548-1.212-13.054 2.244-19.755 4.722-9.222-10.017-13.472-9.585-33.408.306-14.865-12.177-12.33-18.516-23.656-3.65-6.562-6.896-10.044-6.659-18.07 1.421-45.165-9.613-74.84-15.116-82.126-4.29-5.503-7.843-7.69-3.915-10.24 23.392-15.45 28.7-29.828 28.7-29.828 12.44-29.242 23.628-55.95 39.05-67.707 3.107-2.425 11.076-8.373 15.966-10.714 14.391-6.785 21.97-10.894 26.15-14.963 6.617-6.45 11.841-19.894 5.502-28.044-7.885-10.059-21.524-2.076-27.542 1.49-43.007 25.524-49.346 70.55-64.24 96.408-11.883 20.66-31.206 35.832-48.481 37.072-12.957.961-26.916-1.658-40.82-7.76-33.812-14.823-52.314-33.965-56.674-37.35-9.084-7.008-79.606-76.235-136.74-79.063 0 0-7.09-14.196-8.874-14.433-4.18-.53-8.456 8.484-11.521 9.53-2.884.96-7.732-9.767-10.644-9.293m-251.522 413.171c-5.378-.126-9.947-4.542-9.947-10.003l.014-178.214h-58.736v196.45c0 9.627 7.801 17.485 17.372 17.485h102.663c9.64 0 17.345-7.858 17.345-17.485v-196.45h-58.68l-.056 178.214c0 5.461-4.57 9.877-9.975 10.003m196.659-188.217h-88.898c-10.518 0-19.086 8.554-19.086 19.184v194.75h58.79v-178.644c.042-5.475 4.472-9.808 9.934-9.808 5.489 0 9.891 4.235 10.016 9.655v178.798h58.555v-178.8c.07-5.419 4.472-9.654 9.947-9.654 5.434 0 9.92 4.333 9.962 9.808v178.646h58.791v-194.751c0-10.63-8.582-19.184-19.1-19.184zm-343.931 35.665c.042-5.949-4.806-10.184-9.947-10.184h-9.975v108.207h9.975c5.183 0 9.99-4.124 9.947-10.044zm39.413 124.507h-59.335v53.763h-58.708v-213.935h118.42c10.601 0 18.876 8.61 18.876 19.268v121.637c0 10.672-8.595 19.267-19.253 19.267m613.996 5.921c-11.8 0-21.706 10.198-21.706 22.556 0 12.399 9.906 22.513 22.082 22.513 12.079 0 21.859-10.114 21.859-22.513 0-12.386-9.78-22.556-21.86-22.556zm26.442 22.486c0 14.53-11.647 26.345-26.066 26.345-14.573 0-26.275-11.73-26.275-26.345 0-14.336 11.702-26.317 25.843-26.317 14.851 0 26.498 11.62 26.498 26.317"></path><path d="m765.131 448.852c4.082 0 6.228-1.449 6.228-4.346 0-2.578-2.076-3.901-6.047-3.901h-1.17v8.247zm15.033 16.913h-7.008l-9.014-11.995v11.995h-5.726v-30.329h6.019c8.178 0 12.524 3.093 12.524 9 0 3.942-2.563 7.44-6.144 8.484l-.418.154zm-115.591-70.09v-98.51c-.14-5.448-4.528-9.627-10.003-9.627-5.42 0-9.906 4.346-9.947 9.78v98.357zm0 80.205v-53.707h-19.95v53.707h-58.68v-194.751c0-10.63 8.567-19.184 19.086-19.184h99.137c10.547 0 19.115 8.554 19.115 19.184v194.75z"></path></g></svg>
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
              <div className="mx-auto lg:ml-0">
              <Link to="/">
                 
                 <Logo/>
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
  <div className="flex h-full space-x-8">
    {navigation.categories.map((category) => (
      <Popover key={category.name} className="flex">
        <div className="relative flex">
          <PopoverButton className="relative z-[100] -mb-px flex items-center border-b-2 border-transparent pt-px text-xs climate-crisis text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
            {category.name}
          </PopoverButton>
        </div>

        <PopoverPanel
          transition
          className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in z-[10000]" // Aseguramos que tenga un z-index muy alto
        >
          <div aria-hidden="true" className="absolute inset-0 top-full bg-white shadow" />

          <div className="relative bg-white z-[10000]"> {/* Aseguramos que tenga un z-index muy alto */}
            <div className="mx-auto max-w-7xl px-11">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-base sm:text-sm">
                      <div className="relative bg-white p-4 z-[10000]"> {/* Aseguramos que tenga un z-index muy alto */}
                        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-white">
                          <img
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            className="w-full h-full object-contain bg-white"
                          />
                        </div>
                        <a href={item.href} className="mt-6 block montserrat text-gray-900">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {item.name}
                        </a>
                        <p className="mt-1 climate-crisis text-gray-500">Shop now</p>
                      </div>
                    </div>
                  ))}
                </div>

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
