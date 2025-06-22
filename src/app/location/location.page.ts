import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="locations";
  file: any;
  gallery: any;
  idgallery: any;
  editurl: boolean=false;
  config = {
    placeholder: 'Votre description ici...',
    tabsize: 2,
    height: 200,
    uploadImagePath: '/api/upload',
    dialogsInBody: true,
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['link', 'picture']],
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Times']
  }
  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
  category: any;
  order: any;
  lat: any;
  lng: any;
  image2: any;
  image3: any;
  image4: any;
  format: any;
  base64: any;
  address: any;
  cp: any;
  city: any;
  state: any;
  country: any;
  categories: any;
  subcategory: any;
  subcategories: any;
  delay: any;
 
  editcategoryshow:boolean=false; 

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id=params['id']; 
      this.getdata(); 
     // this.galleryByPost();
      this.getCategories();
      this.UrlImage=this.redditService.getUrlImage();
     });
   }

   async getdata() {
    this.redditService.getByid(this.table, this.id).subscribe(data=>{
      console.log(data); 
        this.posts = [data];
        console.log(this.posts); 
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.content = data.content;
        this.url = data.url;
        this.image = data.image;
        this.image2 = data.image2;
        this.image3 = data.image3;
        this.image4 = data.image4;
        this.price = data.price;
        this.view = data.view;
        this.delay = data.delay;
        this.category = data.category;
        this.subcategory = data.subcategory;
        this.order= data.order;
        this.lat= data.lat;
        this.lng= data.lng;


        this.address= data.address,
        this.cp= data.zip,
        this.city= data.city,
        this.state= data.state,
        this.country= data.country
        setTimeout(() => { 
          this.getSubCategories();
        }, 400); 
     

      })
    }
    async galleryByPost() {
      this.redditService.getByid("gallerybypost", this.id).subscribe(data=>{
            this.gallery = data.data;
      })
       
   }

  async  doSave() {

     this.url =  encodeURI(this.title);
     var data = {
      id:this.id,
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      url: this.url,
      image: this.image, 
      image2: this.image2, 
      image3: this.image3, 
      image4: this.image4, 
      lat:this.lat, 
      lng:this.lng,
      delay:this.delay,
      price:this.price,
      category:this.category,
      subcategory:this.subcategory,
      address: this.address,
      zip:this.cp,
      city: this.city,
      state: this.state,
      country: this.country
    }
    console.log(data); 
    this.redditService.update(this.table,this.id,data) 
    .toPromise()
    .then((response) =>{

      console.log(response); 
        setTimeout(() => { 
          this.router.navigateByUrl('/locations');
          }, 600);     
    })}
          


async editurlseo() {
    this.editurl=!this.editurl;
}


async editcategory() {
  this.editcategoryshow=!this.editcategoryshow;
}

onFileChange(event:any) {
  this.file = event.target.files[0];
  console.log(this.file);
  this.submitForm()
;}

async submitForm() {
  let formData = new FormData();
  formData.append("image", this.file, this.file.name);
  formData.append("title", "Image ");
  console.log(formData); 
  this.redditService.uploadFormData(formData) 
  .toPromise()
  .then((response) =>
  {   
    this.image=response;
    setTimeout(() => { 
   
   }, 500); 
  })
}

onFileChangeGallery(event:any) {
  this.file = event.target.files[0];
  console.log(this.file);
  this.submitFormGallery();
}

async submitFormGallery() {
  let formData = new FormData();
  formData.append("image", this.file, this.file.name);
  formData.append("title", "Image ");
  formData.append("postid", this.id);
  this.redditService.uploadGalleryImage(formData) 
  .toPromise()
  .then((response) =>
  { this.galleryByPost();
    setTimeout(() => { 
   }, 500); 
  })
}

async delete(event: any, item: { id: number; }) {
  this.idgallery=item.id;
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
       this.redditService.delete("gallery",this.idgallery)  
      .toPromise()
      .then((response) =>
      {
    setTimeout(() => { 
      this.galleryByPost();
       }, 400); 
      })}}]
    });
  await alert.present();
 }


 async  doCancel() {
  this.router.navigateByUrl('/locations');
 
}



async addFormGallery() {
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
 
  this.image='data:image/'+capturedPhoto.format+';base64,' + this.base64;
 }

 async addFormGallery2() {
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

  this.image2='data:image/'+capturedPhoto.format+';base64,' + this.base64;
 }

 async addFormGallery3() {
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

  this.image3='data:image/'+capturedPhoto.format+';base64,' + this.base64;
 }
 async addFormGallery4() {
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
 
    this.image4='data:image/'+capturedPhoto.format+';base64,' + this.base64;
 }



 async getCategories() {
  this.redditService.getDataAll("public_tags").subscribe(data=>{
      this.categories = data.data;
    })
  }

  categoryChange(event:any) {
    this.category = event.target.value;
    this.subcategory="";
    this.getSubCategories();
  }


  
  async getSubCategories() {
    this.redditService.getByid("public_types", this.category).subscribe(data=>{
        this.subcategories = data.data;
        console.log( this.subcategories); 
      })
    }



  typeChange(event:any) {
    this.subcategory = event.target.value;
  }



}