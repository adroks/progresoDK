Progreso
========
This script creates an array of elements, then loops the array, executing a function for each, while we show the evolution in a list and a percentage bar.

First, we create the UI, which can be a list of all scanned items or a single line with the last item scanned.
Second, by using Mootools and JSON, we create an array of elements, and loop through them, updating the interface according to the percentage, and informing the user of the completed task.

This script will help us, for example, extract information from a DB and update or create separate files in less time, instead of doing it in a single query, avoiding "Time Out" issues.

/*SPANISH*/
Este Script nos ayuda a crear un array de elementos, a ejecutar una función para cada uno de esos elementos, mientras vemos la evolución en un listado y una barra de porcentaje.

Crearemos primero la interfaz de información para el usuario, que puede ser un listado con todos los elementos que vamos recorriendo, o una sola línea con el último elemento escaneado.
Posteriormente, mediante Mootools y usando JSON, crearemos un array de elementos.
Recorreremos esa lista, actualizando la interfaz según el porcentaje, e informando al usuario de la tarea concluida.

Este script nos servirá para, por ejemplo, extraer información de una BBDD y actualizar o crear ficheros por separado en un tiempo menor que si lo hiciesemos en una sola consulta, evitando errores de "Time Out".

Important
==========
- Mootools More with Request.JSONP // Necesario Mootools More con Request.JSONP
- Example is ASP // En el ejemplo, se ha utilizado ASP, se puede adaptar según el lenguaje de programación.

Usage
=====
	new progressDK(elemento, {
		urlCrawl: '/example/example.json'
		, dataCrawl: 'id=1' /*si necesitamos algún query para extraer datos*/
		, urlCreate: '/example/create.asp' /*url del fichero que realizará la acción de cada elemento del array*/
		, synch: 5 /* numero de tareas a la vez*/
		, mode: 'default' /* modo lista o modo único*/
		, funcion: false /* podemos pasarle una función que se ejecutará en vez de urlCreate*/
	});
	
elemento : será el ID del elemento donde queremos crear la interfaz de progreso.
urlCrawl : la url del archivo que generará el array

