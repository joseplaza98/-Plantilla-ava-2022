import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
})
export class ContactosComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  async openMenu(ev:any){
    const menu = await this.popoverController.create({
      component: MenuComponent,
      translucent: true,
      event: ev
    });
    await menu.present();
}

  
}
