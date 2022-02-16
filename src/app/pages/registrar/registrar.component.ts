import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User1 } from 'src/app/models/models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InteractionService } from 'src/app/services/interaction/interaction.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {

  datos: User1 = {
    nombres: null,
    apellidos: null,
    edad: null,
    semestre: null,
    correo: null,
    password: null,
    uid: null,
    perfil: 'estudiante'
  }

  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private firestore: FirestoreService,
    private router: Router) { }

  ngOnInit() { }

  async registrar() {
    this.interaction.presentLoading("Registrando...")
    const respuesta = await this.auth.registrarUser(this.datos).catch((error) => {
      this.interaction.closeLoading();
      this.interaction.presentToast("Error, revise su conexión.")
    })
    if (respuesta) {

      const path = "Usuarios";
      const id = respuesta.user.uid;
      this.datos.uid = id;
      this.firestore.createDoc(this.datos, path, id);
      this.interaction.presentToast('Registrado exitosamente');
      this.router.navigate(['/login']);
    } else {
      this.interaction.presentToast('Error, intente nuevamente');
    }
  }
}
