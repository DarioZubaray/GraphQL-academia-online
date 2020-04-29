import { IResolvers }  from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';

const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(__:void, {curso}): any {

            const itemCurso = {
                id: String(database.cursos.length + 1),
                ...curso
            }

            if(database.cursos.filter(item => item.title === itemCurso.title).length === 0 ) {
                database.cursos.push(itemCurso);
                return itemCurso;
            }

            return {
                id: '-1',
                ...curso,
                title: `Ya existe un curso con este nombre ${curso.title}`
            }
        },
        modificarCurso(__:void, {curso}): any {
            const elementoExiste = _.findIndex(database.cursos, function(o) {
                return o.id === curso.id;
            });

            if(elementoExiste > -1) {
                const valoraciones = database.cursos[elementoExiste].reviews;
                curso.reviews = valoraciones;
                database.cursos[elementoExiste] = curso;
                return curso;
            }

            return {
                id: '-1',
                ...curso,
                title: `No existe curso ha modificar. ID: ${curso.id}`
            }
        },
        eliminarCurso(__:void, {id}) {
            const borrarCurso = _.remove(database.cursos, function(o) {
                return o.id === id;
            });

            if(!borrarCurso[0]) {
                return {
                    id: '-1',
                    title: `No existe el curso ha borrar. ID: ${id}`,
                    description: '',
                    clases: 0,
                    time: 0.0,
                    level: "SIN_NIVEL",
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }

            return borrarCurso[0];
        }
    }
}

export default mutation;