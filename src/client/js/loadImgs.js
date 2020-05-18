const loadLandingpageImgs = () => {
    //PLANE IMAGE CREATE
    const planeImg = document.getElementById("graphic-landingpage-plane");
    planeImg.setAttribute("src", require("../imgs/aereo.png").default);
  
    //MAP IMAGE CREATE
    const mapImg = document.getElementById("graphic-landingpage-map");
    mapImg.setAttribute("src", require("../imgs/mappa.png").default);
  };
  
  const loadAboutIcons = () => {
    const countryIcon = document.getElementById("countryIcon");
    countryIcon.setAttribute(
      "src",
      require("../imgs/icons_about/rosso/icona11.svg").default
    );
    const datesIcon = document.getElementById("datesIcon");
    datesIcon.setAttribute(
      "src",
      require("../imgs/icons_about/rosso/icona22.svg").default
    );
    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.setAttribute(
      "src",
      require("../imgs/icons_about/rosso/icona33.svg").default
    );
    const pictureIcon = document.getElementById("pictureIcon");
    pictureIcon.setAttribute(
      "src",
      require("../imgs/icons_about/rosso/icona44.svg").default
    );
    const infoIcon = document.getElementById("infoIcon");
    infoIcon.setAttribute(
      "src",
      require("../imgs/icons_about/rosso/icona55.svg").default
    );
  };

  export {loadLandingpageImgs, loadAboutIcons}