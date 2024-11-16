import React from 'react';



function ResponsiveDesign(props) {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src="../img/building.jpg" alt="Modern building architecture" />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
                    <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
                </div>
            </div>
        </div>
    )
}
function DarkMode() {
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl dark">
            <div>
                <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
                </span>
            </div>
            <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
            </p>
        </div>
    )
}
function MaxWsm() {
    return (
        <div className='bg-teal-200 '>
            <div className='max-w-sm mx-auto bg-green-200 h-8'>.</div>
            <div className="bg-teal-200 text-sm max-w-prose ...">
                <p>Dolore iste eaque molestias. Eius iure ut eaque accusantium. Voluptas repellendus nobis. Saepe nam accusantium magni veniam qui enim mollitia excepturi sapiente.</p>
            </div>

            <div className="text-base max-w-prose ...">
                <p>Dolore iste eaque molestias. Eius iure ut eaque accusantium. Voluptas repellendus nobis. Saepe nam accusantium magni veniam qui enim mollitia excepturi sapiente.</p>
            </div>

            <div className="text-xl max-w-prose ...">
                <p>Dolore iste eaque molestias. Eius iure ut eaque accusantium. Voluptas repellendus nobis. Saepe nam accusantium magni veniam qui enim mollitia excepturi sapiente.</p>
            </div>
            <div className='h-auto bg-orange-200'>h-auto us iure ut eaque accusantium. Voluptas repellendus nobis. Saepe nam accusantium magni veniam qui enim mollitia excepturi sapiente.</div>
        </div>
    )
}
function NegativeMargins() {
    return (
        <>
            <div className='w-32 h-16 bg-fuchsia-300'></div>
            <div className='-mt-8 bg-fuchsia-500'>mt-8</div>
            {/* <div className="h-48 flex flex-wrap content-start bg-stripes-rose-500 rounded-lg"> */}
            <div className='h-72 rounded-t-xl overflow-hidden bg-gradient-to-r from-rose-50 to-rose-100 p-4'>
                <div className="h-48 flex flex-wrap content-start md:content-around rounded-lg">
                    {/* <div className="h-48 flex flex-wrap content-around rounded-lg"> */}
                    {/* <div className="h-48 flex flex-wrap content-evenly rounded-lg"> */}
                    {/* <div className="h-48 flex flex-wrap content-between rounded-lg"> */}
                    {/* <div className="h-48 flex flex-wrap content-start rounded-lg"> */}
                    {/* <div className="h-48 flex flex-wrap content-center rounded-lg"> */}
                    {/* <div className="h-48 flex flex-wrap content-end rounded-lg"> */}
                    <div className='w-1/2 p-2'>
                        <div className='  h-12 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-rose-500'>1</div>
                    </div>
                    <div className='w-1/2 p-2'>
                        <div className='  h-12 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-rose-500'>2</div>
                    </div>
                    <div className='w-1/2 p-2'>
                        <div className='  h-12 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-rose-500'>3</div>
                    </div>
                    <div className='w-1/2 p-2'>

                        <div className='  h-12 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-rose-500'>4</div>
                    </div>
                    <div className='w-1/2 p-2'>
                        <div className='  h-12 text-white text-2xl font-extrabold rounded-md flex items-center justify-center bg-rose-500'>5</div>
                    </div>



                </div>
                <div className="relative overflow-hidden mb-8">
                    <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-4">
                        <div className="flex items-center p-4 space-x-4 bg-stripes bg-stripes-emerald-500 rounded-lg">

                            <div className="flex-1 py-2  rounded-md bg-emerald-500 text-white text-2xl font-extrabold flex items-center justify-center m-2">1</div>
                            <div className="flex-1 py-8  rounded-md bg-emerald-500 text-white text-2xl font-extrabold flex items-center justify-center m-2">2</div>
                            <div className="flex-1 py-5  rounded-md bg-emerald-500 text-white text-2xl font-extrabold flex items-center justify-center m-2">3</div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function FormFlowbite() {
    return (


        <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                </div>
                <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                    <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                </div>
                <div>
                    <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                    <input type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                </div>
                <div>
                    <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unique visitors (per month)</label>
                    <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
            </div>
            <div className="mb-6">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
            </div>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

            <div className="mb-6">
                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large input</label>
                <input type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label>
                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
                <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

        </form>
    )

}
function AppTailwind() {
    return (
        <>

            <FormFlowbite />
            <MaxWsm />
        </>
    )
}
export default AppTailwind;