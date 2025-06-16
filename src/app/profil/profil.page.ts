import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { runInThisContext } from 'vm';

import { LocalService } from 'src/providers/local.service';
import { AuthenticationService } from 'src/providers/authentication.service';
import { UsersColocPage } from '../users-coloc/users-coloc.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {format} from "date-fns";
import {Swiper } from 'swiper';
import { FileNewPage } from '../file-new/file-new.page';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  public swiper !:Swiper; 
    @ViewChild(IonModal)
    modal!: IonModal;

    public editorValue: string = '';
    table: string="products";
    table1: string="users";
    table3: string="appointements";
    table2: string="projects_byuser";
    table4: string="appointementByUser";
    table5: string="getlocation";
    table6: string="saveappointement";
    table7: string="invoices";
    table8: string="invoicesByUser";
    table10: string="quotesByUser";
    table11: string="return";
    
    view:boolean=true;
    push: boolean=false;
    data: any;
    posts: any;
    image:string="";
    title: string="";
    url: string="";
    urlrewiting: string="";
    meta: string="";
    keyword: string="";
    keywords: any;
    deadlineTask: any;
    postdata: any;
    events: any;
    priority: any;
  
    firstname: any;
    lastname: any;
    email: any;
    user: any;
    namebank: any;
    dombank: any;
    iban: any;
    rib: any;
    bic: any;
    profilid: any;
    profilId: any;
  
    edit:boolean=false;
    edit2:boolean=false;
    edit3:boolean=false;
    edit4:boolean=false;
    edit5:boolean=false;
    edit6:boolean=false;

    segType: string = 'info';
    indicatif : string = '+33';
    phone: any;
    address: any;
    number:any = '';
    complement: any;
    city: any;
    cp: any;
    complemement: any;
    postall: any;
   
    name: any;
    contactList: any;
    partnerId: any;
    phonenew: any;
    firstnamenew: any;
    lastnamenew: any;
    emailnew: any;
    editcontactId: any;
    statuscontactedit: any;
    emailcontactedit: any;
    lastnamecontactedit: any;
    firstnamecontactedit: any;
    statuspartenaire: boolean=false;
    daycreatedAt: any;
    formaddphonetocontact:  boolean=false;

  contactId: any;
  addphone: any;
  indicatifnew:  string = '+33';
  addindicatif: string = '+33';
  phoneId: any;
  phonenumbertype: string = 'MOBILE';
  addtypephone:string = 'MOBILE';
  phonenumbertypenew:string = 'MOBILE';

  clientId: any;
  siren: any;
  id: any;
  files: any;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  datestart: Date= new Date();
  content: string="";
  iduser: any;
  phone_mobile: any;
  phone_number: any;
  company: any;
  notes: any;
  country: any;
  state: any;
  salutation: any;
  customer_type: any;
  shipping_cp: any;
  shipping_address: any;
  shipping_city: any;
  shipping_state: any;
  shipping_country: any;
  shipping_phone: any;
  billing_phone: any;
  tva_number: any;
  siret_number: any;
  role: any;
  client: boolean=false;
  lat: any;
  lng: any;
  userstech: any;
  iduserselected: any;
  listinvoices: any;
  listquotes: any;
  catresult: any=[];
  page: number | undefined;
  category:string="";
  status: string ="";
  filter: string ="";
  products: any;
  onStep3Form!: FormGroup;
  idinvoice: any;
  urlcheckout: string="";
  token: any;
  reponseToken: any;
  user_avatar: any;
  parcours: any;
  code: any;
  format: any;
  base64: string | undefined;
  editpicture: boolean=false;
  sessions: any;
  session_id: any;
  postsprogramme: any;
  session_title: any;
  categories: any;
  per_page:number=300;
  order_id:any="id";
  order_by:any="asc";
  postsrecap: any;
  services: any;
  tuesday: any;
  wednesday: any;
  monday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  url_facebook: any;
  url_instagram: any;
  url_tiktok: any;
  url_website: any;
  url_whatsapp: any;
  certif: any;
 

  slider: any;
  slideOptions = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay: true
};


  images: any;
  imagegallery: any;

    constructor(
      private localStore: LocalService,
      public navCtrl: NavController, 
      public formBuilder: FormBuilder,
      public popoverCtrl: PopoverController,
      public alertController: AlertController,
      private route: ActivatedRoute,
      public LoadingController:LoadingController,  
      public redditService:RedditService, 
      private router: Router,  
      public toastCtrl: ToastController,
      private authService: AuthenticationService,
      public modalController: ModalController, 
      public loadingController:LoadingController) {
  
     }

     ngOnInit() {
      this.route.params.subscribe(params => {
         this.iduser= params['id']; 
         this.getdata(); 
         this.getdataGallery();
         this.getCategories();
         this.getDataFiles();
        });
      }




      
   async  doSaveUser() {

  
    var data = {
     id:this.id,
     salutation: this.salutation,
     firstname: this.firstname,
     lastname: this.lastname,
     user_avatar:this.user_avatar,
     email:this.email,
     phone_mobile: this.phone_mobile,


     address: this.address,
     cp:this.cp,
     city: this.city,
     state: this.state,
     country: this.country,


     lat:this.lat,
     lng:this.lng,

     customer_type: this.customer_type,
     notes: this.notes,
     certif: this.certif,

     role:this.role,
     category:this.category,
   
     

     company:this.company,
     services:this.services,

     monday: this.monday,
     tuesday: this.tuesday,
     wednesday: this.wednesday,
     thursday:this.thursday,
     friday: this.friday,
     saturday: this.saturday,
     sunday: this.sunday,

     url_facebook:this.url_facebook,
     url_instagram:this.url_instagram,
     url_tiktok:this.url_tiktok,
     url_website:this.url_website,
     url_whatsapp:this.url_whatsapp,



     /*
     shipping_address: this.shipping_address,
     shipping_cp:this.shipping_cp,
     shipping_city: this.shipping_city,
     shipping_state: this.shipping_state,
     shipping_country: this.shipping_country,
     shipping_phone: this.shipping_phone,
     billing_phone: this.billing_phone,
     siret_number: this.siret_number,
     tva_number: this.tva_number,
     */

   }
   this.redditService.update(this.table1,this.iduser,data) 
   .toPromise()
   .then(async (response) =>
   {console.log(response);
   setTimeout(() => { 
   this.closeall(); 
   this.getdata();
   
   }, 400); 
          
 })}
         


 






 async getdata() {
  this.redditService.getByid(this.table1, this.iduser).subscribe(data=>{
      this.posts = [data];

      console.log(data); 

  
      this.salutation= data.salutation;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.address = data.address;
      this.cp = data.cp;
      this.city = data.city;
      this.state = data.state;
      this.country= data.country;            
      this.phone_mobile = data.phone_mobile;
      this.phone_number = data.phone_number;
      this.company = data.company;

      this.notes = data.notes;
      this.certif = data.certif;
 

      this.user_avatar = data.user_avatar;
      this.services= data.services;
      this.customer_type = data.customer_type;


      this.parcours= data.parcours;

      this.category= data.category;
      this.role= data.role;
      this.email= data.email;
   
      this.lat= data.lat;
      this.lng= data.lng;
      this.code= data.code;

      this.monday= data.monday;
      this.tuesday= data.tuesday;
      this.wednesday= data.wednesday;
      this.thursday= data.thursday;
      this.friday= data.friday;
      this.saturday= data.saturday;
      this.sunday= data.sunday;


      this.url_facebook= data.url_facebook;
      this.url_instagram= data.url_instagram;
      this.url_tiktok= data.url_tiktok;
      this.url_website= data.url_website;
      this.url_whatsapp= data.url_whatsapp;

   /*
      this.shipping_address = data.shipping_address;
      this.shipping_cp = data.shipping_cp;
      this.shipping_city = data.shipping_city;
      this.shipping_state = data.shipping_state;
      this.shipping_country= data.shipping_country;            
      this.shipping_phone= data.shipping_phone;
      this.billing_phone = data.billing_phone;
      this.tva_number= data.tva_number;
      this.siret_number= data.siret_number;
      */

    })
 }


 async getCategories() {
  this.redditService.getDataAll("public_tags").subscribe(data=>{
    console.log(data); 
      this.categories = data.data;
    })
  }



async editpage() {
    this.edit=!this.edit;
}

async editpage2() {
    this.edit2=!this.edit2;
}

async editpage3() {
    this.edit3=!this.edit3;
    this.catresult=[];
}

async editpage4() {
  this.edit4=!this.edit4;
}

async editpage5() {
  this.edit5=!this.edit5;
}

async editPicture() {
  this.editpicture=!this.editpicture;
}


async closeall() {
  this.edit=false;
  this.edit2=false;
  this.edit3=false;
  this.edit4=false;
}
  


async addFormGallery() {
  console.log("-----ADD FROM GALLERY------");  
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Base64, // file-based data; provides best performance
    quality: 1, // highest quality (0 to 100)
    source: CameraSource.Photos
    //CameraSource:PHOTOS
  });
 
  const loader = await this.LoadingController.create({
   message: "Enregistrement de l'image",
   duration: 2500
   });
   loader.present();
  
   this.format=capturedPhoto.format;
   this.user_avatar="data:image/png;base64,"+capturedPhoto.base64String;
   this.doSaveUser(); 

 }
 
 
 async addFormCamera() {
   const capturedPhoto = await Camera.getPhoto({
   resultType: CameraResultType.Base64, 
   quality: 1, 
   source: CameraSource.Camera
   });
   const loader = await this.LoadingController.create({
     message: "Enregistrement de l'image",
     duration: 2500
     });
   loader.present();
   this.format=capturedPhoto.format;
   this.user_avatar="data:image/png;base64,"+capturedPhoto.base64String;
   this.doSaveUser(); 
  }
  


  
async getdataGallery() {
      this.redditService.getByid("gallerieByuser",  this.iduser).subscribe(data=>{
      this.images = data;
    })
  }


  async addPictureGalleryFormGallery() {



    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      quality: 1, // highest quality (0 to 100)
      source: CameraSource.Photos
      //CameraSource:PHOTOS
    });

 
     this.format=capturedPhoto.format;
     this.base64=capturedPhoto.base64String;
     var data = JSON.stringify({ 
     format: this.format,
     base64: this.base64
     }); 

     const loader = await this.loadingController.create({
      cssClass: 'ion-loading',
      spinner: 'circular',
      message: "Enregistrement de l'image"});
      loader.present();

    this.imagegallery='data:image/'+capturedPhoto.format+';base64,' + this.base64;
   console.log(data); 

   var data = JSON.stringify({ 
    image :this.imagegallery,
    posts_id :this.iduser ,
    edited_by: this.iduser 
    });
  this.redditService.addPost("gallery",data)  
  .subscribe(async (response) => {
    console.log(response); 
    await loader.dismiss();
    this.getdataGallery();
   
  })

 

   
   }

  





  async deletePictureGallery(event: any, item: { id: number; }) {
    this.id=item.id;
    const alert = await this.alertController.create({
      header: 'Supprimer',
      message: 'Voulez-vous vraiment ? ',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Oui',
          handler: () => { 
      this.redditService.delete("gallery",this.id)  
        .toPromise()
        .then((response) =>{
       setTimeout(() => { 
     this.getdataGallery();
     }, 400); 
     })}}]
     });
    await alert.present();
   }

getDayName(date: Date): string {
 // Options pour formater la date
 const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
 // Renvoie le nom complet du jour en utilisant toLocaleDateString
 return date.toLocaleDateString(undefined, options);
}


getMonthName(date: Date): string {
 // Options pour formater la date
 const options: Intl.DateTimeFormatOptions = { month: 'long' };
 // Renvoie le nom complet du mois en utilisant toLocaleDateString
 return date.toLocaleDateString(undefined, options);
}


getYearName(date: Date): string {
 // Options pour formater la date
 const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
 // Renvoie le nom complet du mois en utilisant toLocaleDateString
 return date.toLocaleDateString(undefined, options);
}



async getDataFiles(){
      this.page=1;
      this.redditService.getDataBypageByUser(this.iduser, 1,"files/files_user",100,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
      console.log(data);
      //this.dismissLoader();
        this.files=data.data;
        console.log("----FILES------"); 
        console.log(this.files); 
      })
}  


async editfile(event: any, item: { id: string; }) {
  console.log(item.id); 
  this.router.navigateByUrl('/file-detail/'+item.id);
}



async openModal() {
  const modal = await this.modalController.create({
    component: FileNewPage,
    componentProps: {
      "paramID": "",
    }
  });
  modal.onDidDismiss().then((dataReturned) => {

    this.getDataFiles(); 
    if (dataReturned !== null) {
      ///dataReturned.data;

      this.getDataFiles();
    }
  });
  return await modal.present();
}  
 

}

