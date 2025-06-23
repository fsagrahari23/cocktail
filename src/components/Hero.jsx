import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {

    const videoRef = React.useRef(null);
    const  isMobile = useMediaQuery({maxWidth: 768});
    useGSAP(() => {
        const heroSplit = new SplitText(".title", {
            type: "lines,chars,words"
        });
        const paraSplit = new SplitText(".subtitle", {
            type: "lines"
        });
        heroSplit.chars.forEach((char, index) =>char.classList.add("text-gradient"))
        paraSplit.lines.forEach((line, index) => line.classList.add("adf"));
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger:0.06
        });
        gsap.from(paraSplit.lines, {
            yPercent: 100,
            opacity: 0,
            duration: 1.8,
            ease: "expo.out",
            stagger:0.06,
            delay: 1
        });
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        }).to(".left-leaf", {
            y: -200,
            
        },0).to(".right-leaf", {
            y: 200,
            
        },0);

        const startValue =isMobile?'top 50%': 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';
        let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});

   videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
	};
        
       
    }, []);


  return (
    <>
      <section id="hero" className="noisy">
  <h1 className="title">Mojito</h1>
     <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf"/>
     <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf"/>
      <div className="body">
      <div className="content">
       <div className="space-y-5 hidden md:block">
        <p>Cool , Crisp, Classic</p>
        <p className="subtitle">
            Sip the spirit of Summer
        </p>
       </div>
       <div className="view-cocktails">
        <p className="subtitle">
        Every cocktail on our menu is a blend of premium ingredients, creative mixology, and a touch of magic.
        </p>
        <a href="#cocktails">view Cocktails</a>
       </div>
      </div>
      </div>
      </section>
      <div className="video absolute inset-0">
        <video ref={videoRef}  muted playsInline preload="auto" >
          <source src="/videos/output.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
    </>
  );
};

export default Hero;
