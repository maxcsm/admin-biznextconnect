import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="tags";
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
  subcategories: any;
  subcategory: any;
  idtag: any;
  format: any;
  base64: string | undefined;
 


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
      this.idtag=params['id']; 
      this.getdata(); 
      this.getSubCategories();
      this.UrlImage=this.redditService.getUrlImage();
     });
   }


   async getSubCategories() {
    this.redditService.getByid("public_types",  this.idtag).subscribe(data=>{
        this.subcategories = data.data;
        console.log( this.subcategories); 
      })
    }




   async getdata() {
    this.redditService.getByid(this.table, this.idtag).subscribe(data=>{
        this.posts = [data];
        console.log(this.posts); 
        this.id = this.posts[0].id;
        this.title = this.posts[0].tag_fr;
        this.subtitle = this.posts[0].subtitle;
        this.content = this.posts[0].content;
        this.url = this.posts[0].url;
        this.image = this.posts[0].image;
        this.price = this.posts[0].price;
        this.view = this.posts[0].view;
        this.category = this.posts[0].category;
        this.order= this.posts[0].order;
      })
    }
    async galleryByPost() {
      this.redditService.getByid("gallerybypost", this.id).subscribe(data=>{
            this.gallery = data.data;
      })
       
   }


   async delete(event: any, item: { id: number; }) {
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
      this.redditService.delete(this.table,this.id)  
        .toPromise()
        .then((response) =>{
       setTimeout(() => { 
     this.getSubCategories();
     }, 400); 
     })}}]
     });
    await alert.present();
   }
  async  doSave() {

     this.url =  encodeURI(this.title);
     var data = {
      id:this.id,
      tag_fr: this.title,
     // content: this.content,
     // price: this.price,
     // url: this.url,
      image: this.image, 
    // view: this.view,
    // order: this.order
    }
    console.log(data); 
    this.redditService.update(this.table,this.id,data) 
    .toPromise()
    .then((response) =>{
        setTimeout(() => { 
          this.router.navigateByUrl('/categories');
      }, 600); 
        
    })}
          


async editurlseo() {
    this.editurl=!this.editurl;
}




async addFormGallery() {
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Base64, // file-based data; provides best performance
    quality: 2, // highest quality (0 to 100)
    source: CameraSource.Photos
    //CameraSource:PHOTOS
  });
   this.format=capturedPhoto.format;
   this.base64=capturedPhoto.base64String;
   var data = JSON.stringify({
   format: this.format,
   base64: this.base64
   });


    this.redditService.uploadImageTag(data)
    .toPromise()
    .then(async (response) =>
    {
      this.image=response;
      console.log(response); 
      setTimeout(async () => {
    
     },1000);
    })
    .catch(e => console.log(e));

 }












 async  doCancel() {

  this.router.navigateByUrl('/categories');
 
}





NewSave(){
  var data = JSON.stringify({ 
    tag_fr: this.subcategory,
    type: this.idtag,
    isChecked:0,
    image:""
  });

this.redditService.addPost("tags", data)  
  .subscribe((response) => {
console.log(response);
      setTimeout(() => { 
      this.getSubCategories();
      this.subcategory="";
     }, 400); 
})}

}