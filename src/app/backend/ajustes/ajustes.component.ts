import { Component, OnInit } from '@angular/core';
import { Resultado1 } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InteractionService } from 'src/app/services/interaction/interaction.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {

  data: Resultado1 = {
    equipo1: {
      nombre: '',
      goles: null,
    },
    equipo2: {
      nombre: '',
      goles: null,
    },
    arbitro: '',
    id: '',
  };

  constructor(private database: FirestoreService, private interaction: InteractionService) { }

  ngOnInit() { }

  nuevoResultado() {
    this.interaction.presentLoading('Guardando...');
    const id = this.database.getId();
    this.data.id = id;
    const path = 'Resultados';
    this.database.createDoc(this.data, path, id).then((res) => {
      console.log('esta es la respuesta->', res);
      this.interaction.closeLoading();
      this.interaction.presentToast('Guardado con exito');
    })
  }

}
