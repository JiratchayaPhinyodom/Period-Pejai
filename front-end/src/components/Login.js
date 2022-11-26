import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import "./Login.css"
import Dots from "./pics/dots.png";
import LogoPic from "./pics/app_logo.png";
import AdverPic from "./pics/adver-pic.png";
import AdverPic2 from "./pics/adver-pic2.png";
import DiaryPic from "./pics/diary-pic.png";
import StepOne from "./pics/step1.png";
import StepTwo from "./pics/step2.png";
import StepThree from "./pics/step3.png";
import StepFour from "./pics/step4.png";
import StepFive from "./pics/step5.png";
import StepSix from "./pics/step6.png";
import ScrollToTop from "./ScrollToTop";
import 'animate.css';

//sign in with google
import { signInWithGoogle } from "../firebase"
import { Prev } from "react-bootstrap/esm/PageItem";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const whatis = useRef(null);
  const aboutus = useRef(null);
  const login = useRef(null);
  const instruc = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth"
    })
  }

  return (
    <div className="login">
      <ScrollToTop></ScrollToTop>
      <div className="hero">
          <ul>
          <img src={LogoPic} className= "animate__animated animate__tada animate__infinite" height = "150px"/>
            <a onClick={() => scrollToSection(whatis)} className="link animate__animated animate__fadeIn"> What is Period Pejai?</a>
            <a onClick={() => scrollToSection(instruc)} className="link animate__animated animate__fadeIn animate__delay-1s">Instructions</a>
            <a onClick={() => scrollToSection(login)} className="link animate__animated animate__fadeIn animate__delay-3s">Login</a>
          </ul>
          <div ref={whatis} className="what-is">
          <h3 className="text-title-what-is animate__animated animate__bounceInLeft animate__delay-1s">WHAT IS PERIOD PEJAI?</h3>
          <h2 className="web-des animate__animated animate__fadeIn animate__delay-1s">This Website Is Used To Count Menstrual Cycles, Calculate The Next Menstruation, 
            Ovulation Date, Chance Of Pregnancy And Record Symptoms During Menstruation. 
            It Also Alerts Users (through Line Notify) About The Next Menstruation Period And 
            It Can Be Used To Check The Chances Of Getting Pregnant Too. 
            In Addition, The Data Recorded Within The App Can Be Used As Information For The Doctor. 
            The Doctor Can Assess The Risk Of Developing Related Diseases Based On The History Of The 
            Menstrual Cycle And Recorded Symptoms Such As Ovaries Malfunction, Uterine Fibroids, 
            And Cervical Cancer, Etc.</h2>
            <div className="info-block">
                  <img src={AdverPic} className="adver-pic animate__animated animate__pulse animate__infinite" height = "600px"/>
                  <img src={AdverPic2} className="adver-pic animate__animated animate__pulse animate__infinite" height = "600px"/>
            </div>
          </div>
          <div ref={instruc} className="instruction">
          <h3 className="text-title-what-is animate__animated animate__flash animate__slow animate__infinite">INSTRUCTIONS</h3>
            <img src={StepOne} className="inst-pic" height = "300px"/>
            <img src={StepTwo} className="inst-pic" height = "300px"/>
            <img src={StepThree} className="inst-pic" height = "300px"/>
            <img src={StepFour} className="inst-pic" height = "300px"/>
            <img src={StepFive} className="inst-pic" height = "300px"/>
            <img src={StepSix} className="inst-pic" height = "300px"/>
          </div>
          <div ref={login} className="login-zone">
              <div className="login-topper-form"></div>
                <div className="login-form">
                  <img src={LogoPic} className="App-logo" height = "350px"/>
                  <h1 className="head-login animate__animated animate__headShake animate__slow animate__infinite">Get Start with Period Pejai</h1>
                    <p1 className="paragraph-login">
                    We'll assist you in overcoming
                    the difficulty of forgetting your menstrual cycle.
                    And foretell your period for the next month,
                    As well as assist ladies who wish to plan for the birth of children.</p1>
                    <button onClick={async ()=>{await signInWithGoogle(); window.location.href = "/"}} className="login-google animate__animated animate__shakeY animate__slow animate__infinite">Login in with Google Account</button>
                </div>
              </div>
          </div>
  </div>
  )
}