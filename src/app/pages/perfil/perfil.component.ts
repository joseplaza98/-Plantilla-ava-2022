import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User1 } from 'src/app/models/models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InteractionService } from 'src/app/services/interaction/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  uid: string = null;
  info: User1 = null;

  constructor(
    private authService: AuthService,
    private firestore: FirestoreService,
    public alertController: AlertController,
    private interaction: InteractionService) { }

  ngOnInit() {
    this.authService.stateUser().subscribe(res => {
      this.getUid();
    })
  }

  async getUid() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      this.getInfoUser();
    } else {

    }
  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDoc<User1>(path, id).subscribe(res => {
      if (res) {
        this.info = res;
      }
      console.log(res);

    })
  }


  async editAtributo(name: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar' + name,
      inputs: [
        {
          name,
          type: 'text',
          placeholder: 'Ingrese tu' + name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (ev) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (ev) => {
            console.log('Confirm Ok');
            this.saveAtributo(name, ev[name]);
          }
        }
      ]
    });

    await alert.present();
  }

  async saveAtributo(name: string, input: any) {
   await this.interaction.presentLoading("Actualizando...")
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
      
    };
    updateDoc[name] = input;
    this.firestore.updateDoc(path, id, updateDoc).then(()=>{
      this.interaction.presentToast("Actualizado con exito");
      this.interaction.closeLoading();
    })
  }

}
