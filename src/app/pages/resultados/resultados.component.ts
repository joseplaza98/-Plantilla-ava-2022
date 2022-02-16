import { Component, OnInit } from '@angular/core';
import { Estudiante, Resultado1 } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {

  resultados: Resultado1[]=[];
 
  constructor(private database: FirestoreService) {
   
   }

  ngOnInit() {
    this.getResultados();
   }

  getResultados() {
    this.database.getCollection<Resultado1>('Resultados').subscribe(res=>{
      console.log("Esta es la lectura", res);
      this.resultados= res;
      
    });

  }
}