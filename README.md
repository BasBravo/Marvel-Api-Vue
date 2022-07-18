# Marvel API + VueJs

> Una prueba de front-end con Marvel API + VueJs usando Vite

> Esta app hace un búsqueda sencilla en los recursos de la api de: 'Comics' y 'Personajes'. En la búsqueda por palabra, la api solo se limita a obtener solo lo que EMPIEZA con el término ingresado. Ten en cuenta esto al ver los resultados de tu búsqueda.

Puedes ver la [DEMO](https://marvel-api-vue.vercel.app/) en Vercel 

## Tecnologías

- Node 
- Yarn
- Vue 3 (usando Vite)
- TailwindCss, framework CSS
- Gsap para algunas animaciones

## Configuración de compilación

``` bash
# instalar dependencias
yarn install

# lanzar servidor con recarga en caliente en localhost
yarn dev

# construir para producción con minificación
yarn build
```


## Variables de entorno
Utilizar un .env con las siguientes variables 

``` bash
# Endpoint de la Api de Marvel
VITE_ENDPOINT_BASE='https://gateway.marvel.com/v1/'


# variables para acceder a la api encadenadas den la URL. Sustituir '???'
VITE_ENDPOINT_ACCESS='ts=1000&apikey=???&hash=???'
```# Marvel-Api-Vue
# Marvel-Api-Vue
