# Proyecto Preguntón

Este proyecto consiste en el desarrollo del *frontend* de un juego estilo *Trivia* para jugar con otras personas por internet. El juego puede ser jugado por 3 a 12 jugadores y en cada ronda se define un jugador para ser el *preguntón* quien crea una pregunta la cual es enviada al resto de jugadores. Cada jugador ingresa su respuesta en un tiempo definido, incluyendo el *preguntón* quien debe ingresar la respuesta correcta. A medida que llegan las respuestas, el *preguntón* debe calificar la correctitud de ellas: buena, mas o menos, mala. Terminada la corrección, cada jugador recibirá la respuesta correcta, una respuesta dada por un compañero y la evaluación del *preguntón*, debiendo calificar si la evaluación les parece correcta o no.

El juego lo gana quien terminadas las M rondas, definidas al comienzo del juego, obtenga el mayor puntaje.

El frontend debe permitir lo siguiente:

- Crear una cuenta previamente y loguearse
- Crear una nueva partida o unirse a una ya existente
- Permitir toda la interacción del juego según corresponda al jugador: crear pregunta, enviar respuesta, calificar evaluación
- Mantener visible y actualizado el estado del juego
- Mostrar el estado de cada jugador actualizado: nombre, puntaje, quién es el preguntón, cuántas faltas lleva, si está descalificado
- Mostrar siempre contadores de tiempo para las actividades que lo consideran.

Además, el frontend debe proveer de ayuda al jugador para la respuesta utilizando APIs públicas disponibles. Deberá usar al menos dos APIs distintas para ello.

Todas las preguntas del juego deberán ser referentes a películas o series que estén disponibles para Chile en alguno de los siguientes servicios de streaming: Netflix, HBO Max, Star+, Amazon Prime Video, Apple TV, y que sean estrenadas desde 1990 en adelante.