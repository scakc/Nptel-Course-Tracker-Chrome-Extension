(function() {
  // localStorage.setItem("courseList",null);
	// just place a div at top right
  // just place a div at top right
  var div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.top = '50px';
  div.style.left = 0;
  div.textContent = 'Injected!';
  div.innerHTML='<div id="base" style="z-index:5"><div id = "courseList"><div id="mySidenav" class="sidenav"><div class="uppernav"><H2>Course List</H2></div><div class="midnav"><div class="courseContainer"> <a href="javascript:void(0)" class="closebtn" onclick="closeNav()" >&times;</a><Button class="addbtn">Add</Button><Button class="rembtn">Remove</Button><div class="listed"></div></div></div></div><div id="main"> <span style="font-size:30px;cursor:pointer" class="openNav" onclick="openNav()">&#9776;</span></div><div id = "layerc" style="position:fixed;top:0;right:0;z-index:5;background:rgba(0,0,0,0.35);width:100vw;height:100vh;visibility:hidden;transition: visibility .5s;"></div></div></div>';
  $('body').append(div);
  // $('body').prepend('<div id = "layerc" style="position:fixed;top:0;right:0;z-index:5;background:rgba(0,0,0,0.35);width:74vw;height:100vh;visibility:hidden;transition: visibility .5s;"></div>');



  var base =  document.getElementById('base');

  $("#base").css({"width":"20px","height":"20px","z-index":"9"});
  $("#base").append('<style>.done{background:#FDEDEC;cursor:pointer;padding-right:20px;}.courseContainer a{background:#ffffff;color:#fefefe;border-top:1px solid #3498DB;}.rembtn{position:relative;bottom:0;width:50%;padding:2vh 2vw;background:#fff}.addbtn{position:relative;bottom:0;width:50%;padding:2vh 2vw;background:#fff}.uppernav{background:#3498DB;padding:2vh 2vw;font-size:20px;color:#fff;}.sidenav { height: 100%; width: 0; position: fixed; z-index: 99999; top: 0; left: 0; background-color: #373737; overflow-x: hidden; transition: 0.5s;}.sidenav a { padding: 8px 8px 8px 32px; text-decoration: none; font-size: 16px; color: #818181; display: block; transition: 0.3s;}.sidenav a:hover, .offcanvas a:focus{ color: #f1f1f1;}.sidenav .closebtn { position: absolute; top: 0; right: 25px; font-size: 36px; margin-left: 50px;}#main { transition: margin-left .5s; padding: 16px;}@media screen and (max-height: 450px) { .sidenav {padding-top: 15px;} .sidenav a {font-size: 18px;}}</style>');
  $('body').append('<style>progress {border: 0;background:none;border-radius:60px;height: 3px;padding:0;}progress::-webkit-progress-bar {background-color:  #ccc;border-radius: 15px;}progress::-webkit-progress-value {display:inline-block;float:left;background:#3498DB;border-radius: 15px;}.breadcrumb-arrow li a{z-index:0}#breadcrumbs-course a{z-index:0}</style>');
  $("body").append('<script> function openNav() { document.getElementById("mySidenav").style.width = "250px";document.getElementById("layerc").style.visibility="visible" ;document.getElementById("main").style.marginLeft = "250px"; document.body.style.backgroundColor = "rgba(0,0,0,0.4)"; }function closeNav() { document.getElementById("mySidenav").style.width = "0";document.getElementById("layerc").style.visibility="hidden"; document.getElementById("main").style.marginLeft= "0"; document.body.style.backgroundColor = "white"; } </script>');


  var  vtabs = $(".video-tabs")[1];
  $(vtabs).append('<li class="done"><a>✔/✘</a></li>');

  var leclist = $($($("#ul_nav").find("li")).find('ul')).find('li');
  var len = leclist.length;
  console.log(len);
  var url = $(".topmenu")[0].href;
  var list = $("#breadcrumbs-course").find("li");
  console.log($(list[list.length-2]).find("a")[0].innerHTML);
  var title = $(list[list.length-2]).find("a")[0].innerHTML;
  var position = parseInt((($(".first").find(".header")[0]).href).replace(url,"").replace("#",""));
  if(isNaN(position)){position=1}
  console.log(position);
  var baseUrl = url  + position;
  var done = new Array(len-1);
  for(i = 0;i<len-1;i++){
    done[i] = false;
  }


  loadjson();

  $(".openNav").click(function openNav() {
      document.getElementById("mySidenav").style.width = "25vw";
      document.getElementById("main").style.marginLeft = "250px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      document.getElementById("layerc").style.visibility="visible" ;
  });

  $(".closebtn").click(function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      document.body.style.backgroundColor = "white";
      document.getElementById("layerc").style.visibility="hidden" ;
  });
  $(".done").click(function() {
      var lst = JSON.parse(localStorage.getItem("courseList"));
      if(lst[title] === undefined){

      }else{
        if(lst[title].done[position-1] === false){
          lst[title].done[position-1] = true;
          lst[title].pos = position;
          if (position == (done.length)){lst[title].burl = lst[title].url + 1;}else{lst[title].burl = lst[title].url + (position+1);}

          console.log(lst[title].done);
          //...
          localStorage.setItem("courseList",JSON.stringify(lst));

          loadjson();
          window.location.href = lst[title].burl;
        }else{
          lst[title].done[position-1] = false;
          lst[title].pos = position;
          lst[title].burl = lst[title].url + (position);

          console.log(lst[title].done);
          //...
          localStorage.setItem("courseList",JSON.stringify(lst));

          loadjson();
        }
      }



  });



  $(".rembtn").click(function() {
    var lst = JSON.parse(localStorage.getItem("courseList"));
    if (lst === null) {
        alert("Not Present");
    }else{
      if(lst[title] === undefined){
        alert("Not Present");
      }else{
        delete lst[title];
        localStorage.setItem("courseList",JSON.stringify(lst));
      }


    }

    loadjson();
    console.log(lst);
  });

  $(".addbtn").click(function(){

    var lst = JSON.parse(localStorage.getItem("courseList"));
    if (lst === null) {
      lst = {};
      lst[title]={
          "len":len,
          "title":title,
          "url":url,
          "pos":position,
          "burl":baseUrl,
          "done":done
      };
      //...
      localStorage.setItem("courseList",JSON.stringify(lst));
    }else{
      if(lst[title] === undefined){
        lst[title] = {
            "len":len,
            "title":title,
            "url":url,
            "pos":position,
            "burl":baseUrl,
            "done":done
        };
        //...
        localStorage.setItem("courseList",JSON.stringify(lst));
      }else{
        alert("Already Added");
      }


    }

    loadjson();
    console.log(lst);
  });




  function loadjson(){
    var lsd = JSON.parse(localStorage.getItem("courseList"));

    console.log(length);
    if ( lsd === null){
      $(".done").css({"background":"#999"});
    }else{
      var length = Object.keys(lsd).length;
      console.log(length);
      if(lsd[title] === undefined){
        $(".done").css({"background-color":"#999"});
        for (i=0;i<=done.length;i++){
            emt = (leclist[i]);
            $(emt).css({"background":"#fff"});
        }
      }

      $(".listed").empty();
      var text = "";
      for(i=0;i<length;i++){
        if(lsd[Object.keys(lsd)[i]].title === title){
          done = lsd[title].done;
          console.log(done);
          url = lsd[title].url;
          len = lsd[title].len;
          donestate = lsd[title].done[position-1];
          if(donestate === true){
            $(".done").css({"background":"#D5F5E3"});
          }else{
            $(".done").css({"background":"#FDEDEC"});
          }
          var sum =0;
          var $emt;
          for (j=0;j<=done.length;j++){
            if(done[j]==true){
              sum++;
              emt = (leclist[j]);
              $(emt).css({"background":"#D5F5E3"});
            }else{
              emt = (leclist[j]);
              $(emt).css({"background":"#FDEDEC"});
            }
          }
          text = '<a style="color:#3498DB;background:#eee" href = "'+lsd[title].burl+'" >'+lsd[title].title+'</ br><p style="font-size:14px">Completed:'+sum+'/'+len+'</p><progress style= "width:15vw" value='+sum+' max='+len+'></progress></a>';
        }else{
          var sl = sumlen(lsd[Object.keys(lsd)[i]].done);
          text = '<a href = "'+lsd[Object.keys(lsd)[i]].burl+'" >'+lsd[Object.keys(lsd)[i]].title+'<progress style= "width:5vw" value='+sl[0]+' max='+sl[1]+'></progress></a>';
        }
        $(".listed").append(text);
      }
    }
  }



  function sumlen(a) {
    var su = 0;
    var le = a.length;
    for (j=0;j<le;j++){
      if(a[j]==true){
        su++;
      }else{
      }
    }

    return ([su,le]);


  }










})();
