import { IResolvers }  from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
    Query: {
        estudiante(__:void, {id}): any {
            const resultado = database.estudiantes.filter(e => e.id === id)[0];
            if( resultado === undefined ) {
                return {
                    id: '-1',
                    name: `No se ha encontrado con el id: ${id}`,
                    email: '',
                    courses: []
                }
            }
            return resultado;
        },
        estudiantes(): any {
            return database.estudiantes;
        },
        curso(__:void, {id}): any {
            const resultado = database.cursos.filter(c => c.id === id) [0];
            if( resultado === undefined) {
                return {
                    id: '-1',
                    title: `No se ha encontrado el curso con el ID: ${id}`,
                    description: 'Error al buscar el curso solicitado',
                    clases: 0,
                    time: 0.0,
                    logo: '',
                    level: 'TODOS',
                    path: '',
                    teacher: '',
                    students: [],
                    reviews: []
                }
            }
            return resultado;
        },
        cursos(): any {
            return database.cursos;
        }
    }
}

export default query;