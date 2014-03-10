Progreso
========
Este Script nos ayuda a crear un array de elementos, a ejecutar una función para cada uno de esos elementos, mientras vemos la evolución en un listado y una barra de porcentaje.

Crearemos primero la interfaz de información para el usuario, que puede ser un listado con todos los elementos que vamos recorriendo, o una sola línea con el último elemento escaneado.
Posteriormente, mediante Mootools y usando JSON, crearemos un array de elementos.
Recorreremos esa lista, actualizando la interfaz según el porcentaje, e informando al usuario de la tarea concluida.

Este script nos servirá para, por ejemplo, extraer información de una BBDD y actualizar o crear ficheros por separado en un tiempo menor que si lo hiciesemos en una sola consulta, evitando errores de "Time Out".

Importante
==========
- Necesario Mootools More con Request.JSONP
- En los ejemplos, se ha utilizado ASP, se puede adaptar según el lenguaje de programación.

Uso
===
	new progressDK(elemento, { /*será el ID del elemento donde queremos crear la interfaz de progreso*/
		urlCrawl: '/example/example.json' /*la url del archivo que generará el array*/
		, dataCrawl: 'id=1' /*si necesitamos algún query para extraer datos*/
		, urlCreate: '/example/create.asp' /*url del fichero que realizará la acción de cada elemento del array*/
		, synch: 5 /* numero de tareas a la vez*/
		, mode: 'default' /* modo lista o modo único*/
		, funcion: false /* podemos pasarle una función que se ejecutará en vez de urlCreate*/
	});
