import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Geolocation } from '@capacitor/geolocation';


import * as Leaflet from 'leaflet';
import { LocalService } from 'src/providers/local.service';
import { el } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  map!: Leaflet.Map;
  lat!: number;
  lng!: number;
  location:boolean=false; 
  locationButton:boolean=false; 
  table: string = "users";
  iduser!: any;
  posts: any;
  role: any;
  id: any;
  latsposts: any;
  user: any;

  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public LoadingController: LoadingController,
    private localStore: LocalService ) {

  }


  async ngOnInit() {

    this.getData();
    this.getDataLastPosts();
    this.iduser = this.localStore.getItem('iduser');
    this.role = this.localStore.getItem('role');
    this.redditService.postByid(this.table, this.iduser).subscribe(data => {
      this.user = [data];
    }); 
  }



  async getData() {
    this.redditService.getDataAll("public_count").subscribe(data => {
        this.posts=data;  
        console.log( this.posts); 
      })
    }

  async getDataLastPosts(){
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.redditService.getDataBypage(1,"locations",5,"id","desc","","","").subscribe(data => {
        loading.dismiss();
          this.latsposts=data.data;
        })
  }  
  

  async edit(event: any, item: any) {
    this.router.navigateByUrl('/location/' + item.id);
    }

}
