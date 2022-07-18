

<template>    
    <div class="flex-row space-y-4">
        
        <Filters @get="getData"></Filters>
        
        <TransitionGroup name="list" tag="div" v-if="items" class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-6" @enter="onEnter">
            <div v-if="items.length > 0" v-for="comic in items" :key="comic.id">
                <CatalogItem :type="type"  :data="comic"></CatalogItem>
            </div>
        </TransitionGroup>

        <div v-if="!in_progress && items.length == 0" class="flex flex-col items-center justify-center">
            <div class="text-center">
                <p class="">No se encontraron comics</p>
            </div>
        </div>

        <div v-if="in_progress"  class="inline-flex space-x-4 mx-auto my-10">
            <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="mb-20">
                Buscando {{type=='comics' ? 'comics' : 'personajes'}}...
            </span>
        </div>

    </div>
</template>

<script>
    
    import Marvel from './../api/Marvel';
    import Filters from './../components/Filters.vue'
    import CatalogItem from './../components/CatalogItem.vue'
    import gsap from 'gsap'

    export default {

        components: {
            Marvel,
            Filters,
            CatalogItem,
        },

        data() {
            return {
                type: 'comics',
                in_progress: true,
                limit: 20,
                pages:0,
                items: [],
                index: 0,
                last_query: null,
            };
        },

        mounted() {
            
            //Crear carga infinita al hacer scroll
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 400;
                if (!this.in_progress && bottomOfWindow) this.getComics(this.type);
            };

            this.getData(this.type);
        },

        methods: {
            
            async getData(type, query) {
                
                if(this.type !== type || query !== undefined) {
                    this.items = [];
                    this.pages = 0;
                }else{
                    query = this.last_query;
                }
                
                this.type = type;
                this.in_progress = true;
                this.index = 0;

                if(type == 'comics') await this.getComics(query);
                if(type == 'characters') await this.getCharacters(query);

                this.in_progress = false;
                this.last_query = query;
                this.pages++;
            },

            async getComics(query) {
                
                await Marvel.getComics(query)
                    .then((response) => {
                    
                        response.results.forEach(element => { 
                            this.items.push(element);
                        });
                    })
                    .catch(() => this.error = true)
                    .finally(() => this.loading = false);
            },

            async getCharacters(query) {
                
                await Marvel.getCharacters(query)
                    .then((response) => {
                    
                        response.results.forEach(element => { 
                            this.items.push(element);
                        });
                    })
                    .catch(() => this.error = true)
                    .finally(() => this.loading = false);
            },

            //Animacion para los elementos de la lista
            onEnter(el){
                gsap.from(el, {
                    opacity: 0,
                    y: 50,
                    duration: .3,
                    delay: this.index * 0.05
                });
                this.index++;
            }
        },
    };

</script>