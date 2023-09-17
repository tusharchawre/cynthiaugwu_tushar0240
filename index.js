
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function time(){
    var datetime = new Date().toLocaleTimeString();

    document.getElementById("time").textContent = datetime; 
    setInterval(time, 1000);

}

time();

let crsr = document.querySelector(".minicircle")


function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
        
          
             crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;

        })
    }
    
    
    


function circleSquezer(){
    var xscale =1
    var yscale=1

    var xprev=0
    var yprev = 0

    window.addEventListener("mousemove",function(dets){
    clearTimeout(timeout)           //piche time out clear honge aur next execute hoga jaise hi first mouse move nhi execute hua toh

        var xdiff = dets.clientX - xprev
        xprev = dets.clientX

        var ydiff = dets.clientY - yprev
        yprev = dets.clientY


       xscale = gsap.utils.clamp(0.8,1.2,xdiff)
       yscale = gsap.utils.clamp(0.8,1.2,ydiff)

       circleMouseFollower(xscale,yscale) //values bhej di hai 
       //basically, we executing this function with yaha ke x scale aur y scale ke parameter
       //function ke andar function

    //    document.querySelector(".info").addEventListener("mousemove",function(){
    //     circleMouseFollower(xscale*10,yscale*10)
    // })

    

       timeout = setTimeout(function(){             //yaha kar rahe timeout. like jab cursor ruke 
                                                    
crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
        //scale kar do one, jaise hi function execute ho purane shit kardo clear pehle
                                                //purana shit gets clear every time mouse move. mouse move band. set Timeout execute hoga
                                                //and then you are fine  
    
    })
    

}

circleSquezer()






function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from(".navbar",{
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut

        
    })
    tl.from(".titlefooter",{
        opacity:0,
        y: -10,
        ease: Expo.easeInOut,
        duration: 0.5
    })

    tl.to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration: 1.5,
        stagger: 0.2,
        delay: -0.5,

        
    })
   
}

firstPageAnim();








document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove",function(){
        gsap.to(elem.querySelector("h1"),{
            opacity:0.5,
            x: 20,

        })
    })

  
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
      gsap.to(elem.querySelector("h1"),{
        opacity:1,
        x:0,
    })
    });

   
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;

  



      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });



