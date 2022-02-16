export interface Equipo {
  nombre: string;
  logo: string;
  id: string;
  puesto: number;

}

export interface Estudiante {
  nombre: string;
  apellido: string;
  edad: number;
  sexo: 'M' | 'F';
  cedula: string;
}

export interface Resultado1 {
  equipo1: {
    nombre: string;
    goles: number;
  },

  equipo2: {
    nombre: string;
    goles: number;
  },

  arbitro?: string;
  id: string;

}

export interface User1{
  nombres: string;
  apellidos: string;
  edad: number;
  semestre: number;
  correo: string;
  password: string;
  uid: string;
  perfil: 'estudiante' | 'admin';
}