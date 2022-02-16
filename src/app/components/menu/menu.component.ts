import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User1 } from 'src/app/models/models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InteractionService } from 'src/app/services/interaction/interaction.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false;
  rol: 'estudiante' | 'admin' = null;

  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private router: Router,
    private firestore: FirestoreService) {

    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit() { }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Sesión Finalizada con Exito');
    this.router.navigate(['/home']);
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<User1>(path, id).subscribe(res => {
      this.rol = res.perfil;
    })
  }

}
