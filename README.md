# Canvis Realitzats

## Descripció
L'objectiu és implementar un sistema que permet editar experiències dins d'una llista.
Cada experiència tindrà un botó "Editar" que, en ser pressionat, obrirà un formulari per
modificar els seus detalls.
* Afegir un botó
* Crear un formulari d’edició
* Gestionar l’estat 

## Canvis Realitzats

### 1. `ExperienciaList.js`
- **Afegit botó "Editar"**: Cada experiència té un botó "Editar" per modificar els seus detalls.
- **Gestió de l'estat**: Control de l'experiència actual que s'està editant i la visibilitat del formulari.
- **Obtenir noms dels usuaris**: Petició addicional per obtenir els noms dels usuaris i mostrar-los en lloc dels seus IDs.

### 2. `ExperienciaForm.js`
- **Reutilització del formulari**: Formulari per crear noves experiències i editar les existents.
- **Gestió de l'estat**: Control dels camps del formulari i actualització dels detalls de l'experiència.
- **Obtenir noms dels usuaris**: Petició addicional per obtenir els noms dels usuaris.

### 3. `experiencias.js`
- **Afegit formulari de creació**: Botó "Añadir Nueva Experiencia" per obrir un formulari de creació.
- **Gestió de l'estat**: Control de la visibilitat del formulari de creació.
- **Funcions CRUD**: Funcions per crear, actualitzar i eliminar experiències.

### 4. Estils CSS
- **CSS Modules**: Fitxers CSS Modules per estilitzar els components de manera més atractiva.
  - `ExperienciaList.module.css`
  - `ExperienciaForm.module.css`
  - `experiencias.module.css`

## Fitxers Modificats
- `components/ExperienciaList.js`
- `components/ExperienciaForm.js`
- `pages/experiencias.js`
- `components/ExperienciaList.module.css` (nou)
- `components/ExperienciaForm.module.css` (nou)
- `pages/experiencias.module.css` (nou)