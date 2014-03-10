progreso
========

Este Script nos ayuda a crear un array de elementos, a ejecutar una función para cada uno de esos elementos, mientras vemos la evolución en un listado y una barra de porcentaje.

Crearemos primero la interfaz de información para el usuario, que puede ser un listado con todos los elementos que vamos recorriendo, o una sola línea con el último elemento escaneado.
Posteriormente, mediante Mootools y usando JSON, crearemos un array de elementos.
Recorreremos esa lista, actualizando la interfaz según el porcentaje, e informando al usuario de la tarea concluida.

Este script nos servirá para, por ejemplo, extraer información de una BBDD y actualizar o crear ficheros por separado en un tiempo menor que si lo hiciesemos en una sola consulta, evitando errores de "Time Out".
