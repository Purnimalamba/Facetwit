import { Component, OnInit } from '@angular/core';
declare var TwitterVariable:any;

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
auth;
twitter=[];
flag=0;
buttonFlag=1;
passwrd;
password;
  constructor() { }



Twitterlogin(){
TwitterVariable.__call("oauth_authorize",{},(auth_url)=>{
                
                console.log(auth_url)
                this.auth=window.open(auth_url);
                console.log(this.auth+"I am auth");
            })

}


PinSubmit(pass){
     if (pass){
       TwitterVariable.__call("oauth_accessToken",{oauth_verifier: pass},(reply)=>{ 
                // store the authenticated token, which may be different from the request token (!)
                console.log(reply)
               
                var token = reply.oauth_token;
                var secret = reply.oauth_token_secret;
                TwitterVariable.setToken(token, secret);
                console.log(TwitterVariable);
              } )  
      TwitterVariable.__call("oauth2_token",{},(reply)=>{
     
        var bearer_token = reply.access_token;
        console.log(bearer_token+ "Before b Token");
        TwitterVariable.setBearerToken("bearer_token"); 
        //console.log(cb+ "after b Token");
     })
     }         
}

Twitterlogindetails(){
 {
     this.flag=1;
      this.buttonFlag=0;
      TwitterVariable.__call("account_verifyCredentials",{},(reply)=>{
        console.log(reply);
        //console.log(cb)
        this.twitter=reply;
      }
    );       
}
}
  ngOnInit() {
    TwitterVariable.setConsumerKey("vRoRa2OZGnuqGU4N566nUpn98", "Jj1zCw6xagSILgzE211QkvcILx3hPlyjxT6jEcpJ6qm6et66b9");
      TwitterVariable.__call(
    
       "oauth_requestToken",
      {oauth_callback: "oob"}//Redirects to enter the pin generated
    ,(res)=>{
      //console.log(res.oauth_token+"I am twitter");
      TwitterVariable.setToken(res.oauth_token, res.oauth_token_secret);
      console.log(TwitterVariable);
    })
  }
  }


