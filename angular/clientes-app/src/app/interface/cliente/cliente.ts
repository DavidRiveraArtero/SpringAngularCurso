export interface ICliente{
  id       : number;
  nombre   : string;
  apellido : string;
  email    : string;
  createAt : string;
}

export class Cliente implements ICliente{
  id       !: number;
  nombre   !: string;
  apellido !: string;
  email    !: string;
  createAt !: string;





}

