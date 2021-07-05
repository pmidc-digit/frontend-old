import React from "react";
// nodejs library that concatenates classes
//import classNames from "classnames";
// react components for routing our app without refresh
//import { Link } from "react-router-dom";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
//import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// sections for this page
import TeamSection from "../LandingPage/Sections/TeamSection";
//import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SelectCards from "./Sections/SelectCards.js";
import SectionFAQs from "./Sections/SectionFAQs.js";
import  "./index.scss"
//import SectionTabs from "./Sections/SectionTabs.js";
//import SectionPills from "./Sections/SectionPills.js";
//import SectionNotifications from "./Sections/SectionNotifications.js";
//import SectionTypography from "./Sections/SectionTypography.js";
//import SectionJavascript from "./Sections/SectionJavascript.js";
//import SectionCarousel from "./Sections/SectionCarousel.js";
//import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
//import SectionExamples from "./Sections/SectionExamples.js";
//import SectionDownload from "./Sections/SectionDownload.js";

//import styles from "assets/jss/material-kit-react/views/components.js";

//const useStyles = makeStyles(styles);

export default function Components() {
  //const classes = useStyles();
  return (
    <div style={{backgroundColor: "#f3f4f5 !important"}}>
      <SectionNavbars />
      <SelectCards /> 
            <Card  id="message" >                   
                <CardBody >
                <h4 >Pay your property tax before March 31st get 10% Rebate</h4>
              
                </CardBody>               
              </Card>
              <div  id="faqheader" style ={{marginTop: "100px",fontWeight: "bold"}}>                   
                <center ><b><h2  style ={{fontWeight: "bold"}}>Frequently Asked Questions</h2></b>
                </center>
                <div  
              style={{marginLeft: "45%",
                marginRight: "45%", borderBottom: "5px solid #f48952"}}>     
                </div>              
                        
              </div>                   
              <div  style={{marginTop: "10px"}}>     </div>  
                      
          <div id="faqs"><SectionFAQs /> </div>
          <div  id="citizenheader" >                   
                <center ><b><h2 style ={{fontWeight: "bold"}}>Citizen Speaks</h2></b>
                </center>
                <div  
                style={{marginLeft: "45%",
                  marginRight: "45%", borderBottom: "5px solid #f48952"}}>     </div>              
                          
                </div>                  
      <div  style={{marginTop: "10px"}}>     </div>  
      <div id="testimonials"><TeamSection /></div>
      <Footer />
    </div>
  );
}
