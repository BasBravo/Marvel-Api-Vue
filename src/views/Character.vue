<template>
    <div>
        <div class="bg-gray-100 border-gray-200 border rounded p-4 mb-4">
            <div class="flex items-center space-x-6 text-left">
                <router-link to="/" class="opacity-30 hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </router-link>
                <span v-if="character.name" class="fade">Personaje: <span class="capitalize">{{character.name}}</span></span>
            </div>
        </div>

        <div class="grid grid-cols-7">
            <div class="col-span-7 md:col-span-3">
                <div class="image bg-black rounded-xl overflow-hidden">
                    <div v-if="character.id" class="aspect-3/4 overflow-hidden rounded-xl shadow-2xl">
                        <img :src="thumbnail" class="object-cover h-full w-full" :alt="character.name" />
                    </div>
                </div>
            </div>
            <div class="col-span-7 md:col-span-4 p-4 text-left">
                
                <ul v-if="character.id" class="fade space-y-4">
                    <li>
                        <label class="text-gray-400 text-xs uppercase">Id</label>
                        <br>
                        <span class="capitalize">{{character.id}}</span>
                    </li>
                    <li>
                        <label class="text-gray-400 text-xs uppercase">character</label>
                        <br>
                        <h1 class="text-2xl capitalize">{{character.name}}</h1>
                    </li>
                    <li v-if="character.description">
                        <label class="text-gray-400 text-xs uppercase">Descripción</label>
                        <br>
                        <span class="capitalize">{{character.description}}</span>               
                    </li>
                </ul>

            </div>
        </div>

        <div v-if="!character.id"  class="inline-flex space-x-4 mx-auto my-10">
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
                character: {},
                imageNotFound: this.$panda.imageNotFound
            };
        },

        computed: {
            thumbnail() {
                if(this.character.thumbnail && this.character.thumbnail.path != this.imageNotFound){
                    return (this.character.thumbnail.path +'.'+ this.character.thumbnail.extension).replace('http', 'https');
                }else{
                    return '/not-found.jpg';
                }
            },
        },

        mounted() {
            this.getCharacter();
        },

        methods: {

            getCharacter() {
                
                Marvel.getCharacter(this.$route.params.id)
                    .then((response) => {
                        this.character = response.results[0];
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

