<template>
    <router-link v-if="data" :to="`/${type}/${data.id}`">
        <div class="bg-gray-100 border-gray-200 border rounded-xl w-full aspect-[3/4] overflow-hidden relative hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-105">
            <div class="absolute bottom-4 left-0 w-full z-10 text-white px-4 text-left text-sm">
                <span class="border-l-2 flex pl-3 border-white capitalize">{{data.title ? data.title : data.name}}</span>
            </div>
            <div class="bg-gradient-to-t from-black absolute h-3/5 bottom-0 left-0 w-full"></div>
            <img :src="thumbnail" class="object-cover bg-black h-full w-full" :alt="data.title ? data.title : data.name">
            {{data.thumbnail.path}}
        </div>
    </router-link>
</template>

<script>
    export default {
        
        props: {
            type: {
                type: String,
                default: 'comic'
            },
            data: {
                type: Object,
                required: true
            },
        },

        data() {
            return {
                imageNotFound: this.$panda.imageNotFound
            }
        },

        computed: {
            thumbnail() {
                if(this.data.thumbnail && this.data.thumbnail.path != this.imageNotFound){
                    return (this.data.thumbnail.path +'.'+ this.data.thumbnail.extension).replace('http', 'https');
                }else{
                    return '/not-found.jpg';
                }
            },
        },

    }
</script>