<template>

    <form ref="formFilters" @submit.prevent="get" class="bg-gray-100 border-gray-200 border rounded p-4">
        <div class="flex items-center" :class="[!open ? 'justify-between' : 'justify-end']">
            <div v-show="!open" class="flex items-center space-x-2">
                <input dataType="text" name="titleStartsWith" placeholder="..." v-model="query.titleStartsWith" v-on:keyup.enter="get()" :class="$panda.styles.input" />
                <button type="submit" class="flex" :class="$panda.styles.buttonPrimary">
                    <span>Buscar</span>
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span class="hidden md:block text-sm text-gray-400">Avanzado</span>
                <div :class="$panda.styles.buttonPrimary" @click="open = !open;">
                    <ChevronDownIcon v-if="!open" class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                    <ChevronUpIcon v-if="open" class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                </div>
            </div>
        </div>

        <div v-show="open">

            <!-- <input dataType="hidden" handler="hidden" name="open" v-model="form.data.filters.open" :set="data.filters && data.filters.open ? data.filters.open : null" /> -->

            <div class="grid grid-cols-4 gap-6 py-4">

                <div class="text-left col-span-2">
                    
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Buscar en</label>
                    <div class="form-check">
                        <input type="radio" name="type" id="type_comics" v-model="type" value="comics" class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                        <label class="form-check-label inline-block text-gray-800" for="type_comics">Comics</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" name="type" id="type_characters" v-model="type" value="characters" class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                        <label class="form-check-label inline-block text-gray-800" for="type_characters">Personajes</label>
                    </div>

                </div>

                <div v-for="input in inputs" :key="input.key" v-show="input.filter == '' || input.filter == type" class="col-span-2">
                    
                    <!-- Text -->
                    <div v-if="input.type=='text'" class="text-left">
                    
                        <label :for="input.key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{input.label}}</label>
                        <input type="text" :id="input.key" :class="$panda.styles.input" :name="input.key" v-model="query[input.key]" v-on:keyup.enter="get()" />

                    </div>
                    
                    <!-- Number -->
                    <div v-if="input.type=='number'" class="text-left">
                    
                        <label :for="input.key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{input.label}}</label>
                        <input type="number" :id="input.key" :class="$panda.styles.input" :name="input.key" v-model="query[input.key]" v-on:keyup.enter="get()" />

                    </div>
                    
                    <!-- Radio -->
                    <div v-if="input.type=='radio'" class="text-left">
                    
                        <label :for="input.key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{input.label}}</label>
                        <div v-for="(option, key) in input.values" class="form-check">
                            <input type="radio" :name="input.key" :id="option" v-model="query[input.key]" :value="option" class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer">
                            <label class="form-check-label inline-block text-gray-800" :for="option">
                                {{key}}
                            </label>
                        </div>

                    </div>

                    
                    <!-- Select -->
                    <div v-if="input.type=='select'" class="text-left relative">
                        <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-3 right-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <label :for="input.key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{input.label}}</label>
                        <select :id="input.key" class="appearance-none" :class="$panda.styles.input" :name="input.key" :label="input.label" handler="select" v-model="query[input.key]">
                            <option value="">{{input.empty}}</option>
                            <option v-for="(option, key) in input.values" :value="option">{{key}}</option>
                        </select>
                    </div>

                </div>

                <div class="col-span-4 flex space-x-2 justify-end">
                    <button type="button" :class="$panda.styles.buttonPrimary" @click="reset()">
                        Limpiar
                    </button>
                    <button type="submit" :class="$panda.styles.buttonPrimary">
                        Buscar
                    </button>
                </div>

            </div>
        </div>

    </form>
    
</template>

<script>
import {
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/vue/outline'
export default {
    components: {
        ChevronDownIcon,
        ChevronUpIcon
    },
    
    props: {
        
    },

    data() {
        return {
            query: {},
            type: 'comics',
            open: false,
            inputs: [  
                {
                    label: 'Título',
                    type: 'text',
                    filter: 'comics',
                    key: 'titleStartsWith'
                },
                {
                    label: 'Nombre',
                    type: 'text',
                    filter: 'characters',
                    key: 'nameStartsWith'
                },
                {
                    label: 'Año',
                    type: 'number',
                    filter: 'comics',
                    key: 'startYear'
                },                
                {
                    label: 'Formato',
                    type: 'select',
                    filter: 'comics',
                    key: 'format',
                    empty: 'Todos',
                    values: {
                        Comic: 'comic',
                        'Digital Comic': 'digital comic',
                        Hardcover: 'hardcover'
                    }
                },
            ]
        };
    },

    watch: {
        type(value) {
            this.query = {};
        }
    },
    
    mounted() {
    },

    methods: {
        get(){
            this.$emit("get", this.type, this.query, true);
        },
        reset() {
            this.$refs.formFilters.reset();
        },
    },
}
</script>
