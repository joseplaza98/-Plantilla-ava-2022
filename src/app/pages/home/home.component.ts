import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    public popoverController: PopoverController,
    private firestore: FirestoreService
    ) { }

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

