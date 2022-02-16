import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './backend/ajustes/ajustes.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { AngularFireAuthGuard, canActivate } from '@angular/fire/compat/auth-guard'; 
import { map } from 'rxjs/operators';

const uidAdmin ='QHUEgrWW6RNF4Fkts1cFhl63FbG3';
const onlyAdmin = () => map ((user: any) => !!user && user.uid == uidAdmin);


const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'contactos', component: ContactosComponent},

  {path: 'resultados', component: ResultadosComponent},

  {path: 'login', component: LoginComponent},

  {path: 'ajustes', component: AjustesComponent, ...canActivate(onlyAdmin)},

  {path: 'registrar', component: RegistrarComponent},

  {path: 'perfil', component: PerfilComponent, canActivate: [AngularFireAuthGuard]},

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
