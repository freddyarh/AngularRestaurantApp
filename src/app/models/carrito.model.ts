export class Carrito {
    id : string;
    producto: string;
    cantidad : number;
    precio: number;

    constructor(id:string, producto:string, cantidad:number, precio:number){

        this.id = id,
        this.producto = producto,
        this.cantidad = cantidad,
        this.precio = precio
        
        
    }
}