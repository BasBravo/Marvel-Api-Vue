<template>
    <div class="max-w-2xl mx-auto px-5">
        <div class="space-y-4 w-full my-4 text-center">
            <div class="mx-auto inline-flex text-xs text-red-600 items-center space-x-2 uppercase font-bold">
                <span>Made with</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                <span>for</span>
            </div>
            <router-link class="cursor-pointer" to="/"> 
                <img src="/logo.png" class="mx-auto" alt="PandaGo logo" />
            </router-link>
            <router-view />
        </div>
    </div>
</template>

