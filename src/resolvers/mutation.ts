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
        }
    }
}

export default mutation;