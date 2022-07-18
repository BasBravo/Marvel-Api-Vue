
export default {
    install(app) {

        const panda = {
            imageNotFound: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            styles: {
                input: 'border border-gray-300 rounded-md shadow-sm py-2 px-4 w-full focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-base placeholder-gray-200',
                buttonPrimary: 'whitespace-nowrap outline-none text-black text-sm font-medium justify-center text-center py-2 px-4 ring-1 ring-gray-300 border-b-gray-800 border-b-2 border-opacity-20 active:translate-y-0.5 active:border-opacity-0 cursor-pointer bg-gradient-to-tr from-gray-50 via-gray-50 to-white hover:shadow-lg active:shadow-inner shadow-gray-500/20 hover:shadow-gray-500/40 rounded hover:bg-opacity-90 font-medium transition-shadow transition-opacity',
            },
        }
        
        app.config.globalProperties.$panda = panda;
        
    },
}
