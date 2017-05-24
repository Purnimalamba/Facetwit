import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams , LoginResponse,LoginOptions} from 'ngx-facebook';
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  data;
  token;
  res;
  app;
  friend;
  flag=0;
  buttonFlag=1;
  // details={ first_name: "", last_name: "", email: "", id: "",friends: "",post:"",gender: ""};
  details;

 constructor(private fb: FacebookService) {
 
    let initParams: InitParams = {
      appId: '128129404409067',
      xfbml: true,
      version: 'v2.8'
    };

    
 
    fb.init(initParams);
 
  }
  FBlogin(){
     const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_posts,public_profile,user_friends,email,pages_show_list,publish_actions'
    };
    this.fb.login(loginOptions)
      .then((response: LoginResponse) => {
        console.log(response)
      this.data= response.authResponse.userID;
      this.token= response.authResponse.accessToken;
    })
      .catch((error) => console.log(error));
       

 
  }

 FBlogindetails(){
   this.flag=1;
   this.buttonFlag=0;
this.app='/'+this.data+'/friends'+'?access_token='+this.token;
console.log(this.app);
 this.fb.api('/me?fields=gender,first_name,last_name,email')
       .then((res: any) => {
        this.details=res;
        console.log(this.details);
      })
 this.fb.api(this.app).then((response)=>{
        console.log(response)
        this.friend=response.summary.total_count;  
        this.details.friends=this.friend;
        console.log(this.details.friends);

      }) 

      this.fb.api("/me/feed?limit=1000")
   .then((res)=>{
     console.log(res);
     this.details.post=res.data.length;
    


   })    
      .catch((error) => console.log(error));
      
 }

 post(postdata)
  {
   console.log(postdata)
   this.fb.api("/me/feed","post",{"message": postdata})
   .then((res)=>{
     console.log(res);
     alert("Post Successfull");


   })    
  }

  ngOnInit() {
    this.details={ first_name: "", last_name: "", email: "", id: "",friends: "",post:"",gender: ""};
  }

}
