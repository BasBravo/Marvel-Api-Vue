<template>
    <div>
        <div class="bg-gray-100 border-gray-200 border rounded p-4 mb-4">
            <div class="flex items-center space-x-6 text-left">
                <router-link to="/" class="opacity-30 hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </router-link>
                <span v-if="comic.title" class="fade">Comic: <span class="capitalize">{{comic.title}}</span></span>
            </div>
        </div>

        <div class="grid grid-cols-7">
            <div class="col-span-7 md:col-span-3">
                <div class="image bg-black rounded-xl overflow-hidden">
                    <div v-if="comic.id" class="aspect-3/4 overflow-hidden rounded-xl shadow-2xl">
                        <img :src="thumbnail" class="object-cover h-full w-full" :alt="comic.title" />
                    </div>
                </div>
            </div>
            <div class="col-span-7 md:col-span-4 p-4 text-left">
                
                <ul v-if="comic.id" class="fade space-y-4">
                    <li>
                        <label class="text-gray-400 text-xs uppercase">Id</label>
                        <br>
                        <span class="capitalize">{{comic.id}}</span>
                    </li>
                    <li>
                        <label class="text-gray-400 text-xs uppercase">Comic</label>
                        <br>
                        <h1 class="text-2xl capitalize">{{comic.title}}</h1>
                    </li>
                    <li v-if="comic.description">
                        <label class="text-gray-400 text-xs uppercase">Descripción</label>
                        <br>
                        <span class="capitalize">{{comic.description}}</span>               
                    </li>
                    <li v-if="comic.format">
                        <label class="text-gray-400 text-xs uppercase">Formato</label>
                        <br>
                        <span class="capitalize">{{comic.format}}</span>              
                    </li>
                </ul>

            </div>
        </div>

        <div v-if="!comic.id"  class="inline-flex space-x-4 mx-auto my-10">
            <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="mb-20">
                Cargando contenido...
            </span>
        </div>

    </div>
</template>

<script>

    import gsap from 'gsap'
    import Marvel from './../api/Marvel';

    export default {

        components: {
            Marvel,
        },

        data() {
            return {
                comic: {},
                imageNotFound: this.$panda.imageNotFound
            };
        },

        computed: {
            thumbnail() {
                if(this.comic.thumbnail && this.comic.thumbnail.path != this.imageNotFound){
                    return (this.comic.thumbnail.path +'.'+ this.comic.thumbnail.extension).replace('http', 'https');
                }else{
                    return '/not-found.jpg';
                }
            },
        },

        mounted() {
            this.getComic();
        },

        methods: {

            getComic() {
                
                Marvel.getComic(this.$route.params.id)
                    .then((response) => {
                        this.comic = response.results[0];
                        this.initAnimation();
                    })
                    .catch(() => this.error = true)
                    .finally(() => this.loading = false);
            },

            initAnimation(){
                gsap.from('.image', {
                    opacity: 0,
                    y: 50,
                    duration: .2,
                });

                gsap.from('.fade', {
                    opacity: 0,
                    duration: .2,
                    delay: .3,
                });
            }
        },
    };

</script>

