import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { InteractionService } from 'src/app/services/interaction/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  credenciales = {
    correo: null,
    password: null,
  }

  constructor(
    private auth: AuthService,
    private interaction: InteractionService,
    private router: Router) { }

  ngOnInit() {}

  async login(){
    await this.interaction.presentLoading("Cargando...")
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch(error =>{
      this.interaction.closeLoading();
      this.interaction.presentToast("Usuario o contraseña invalido")
    })
  if (res){
    this.interaction.closeLoading(); 
    this.interaction.presentToast("Bienvenido a HARDISK-APP");
    this.router.navigate(['/home']);
  }
  }
}
