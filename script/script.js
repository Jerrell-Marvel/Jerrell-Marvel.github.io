const onLoadAnimation = document.querySelector(".main__onload--animation");
const headerH1 = Array.from(document.querySelector(".main__header--text h1").textContent);
const headerP = Array.from(document.querySelector(".main__header--text p").textContent);
const headerText = [...headerH1, ...headerP];
const headerTextContainer = document.querySelector(".main__header--text");
const headerImg = document.querySelector(".main__header img");
const mainBottomLine = document.querySelector(".main__bottom-line");
const mainTopLine = document.querySelector(".main__top-line");

// Cursor
let cursor = document.querySelector(".cursor");
cursor.style.display = "none";
document.addEventListener("mousemove", (e) => {
  cursor.style.display = "block";
  cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
});

// Window on load animation
window.addEventListener("load", function () {
  themeToggleBtn.style.opacity = "0.7";
  onLoadAnimation.classList.add("main__onload--animation-active");
  let headerH1Arr = headerH1.map((e) => `<span class="h1" data-txttheme="dark">${e}</span>`).join("");
  headerTextContainer.innerHTML = headerH1Arr;
  let headerPArr = headerP.map((e) => `<span class="p" data-txttheme="dark">${e}</span>`).join("");
  headerTextContainer.innerHTML += `<br><br>${headerPArr}`;

  setTimeout(() => {
    const headerTextContainerChildren = [...headerTextContainer.children];
    headerTextContainerChildren.forEach((children, index) => {
      setTimeout(() => {
        children.style.opacity = "1";
      }, 75 * index);
    });
    headerImg.style.opacity = "1";
    headerImg.style.transform = "translateY(0)";
    mainBottomLine.style.opacity = "1";
    mainTopLine.style.opacity = "1";
  }, 1200);
});

// Parallax mouse move
const main = document.querySelector(".main");
main.addEventListener("mousemove", function (e) {
  const mainHeader = document.querySelector(".main__header");
  const mainHeaderText = document.querySelector(".main__header--text");
  const mainHeaderImg = document.querySelector(".main__header--image");
  mainHeaderArr = [mainHeader, mainHeaderText, mainHeaderImg];
  mainHeaderArr.forEach((el) => {
    let x = e.clientX / 75;
    let y = e.clientY / 75;

    el.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// Progress bar and parallax image
const mainHeader = document.querySelector(".main__header");
const progressBar = document.querySelector(".progress-bar");
const aboutImage = document.querySelector(".about__container--one img");
const aboutSection = document.querySelector(".about");
window.addEventListener("scroll", function () {
  let documentHeight = document.documentElement.scrollHeight - mainHeader.offsetHeight;
  let scrollY = window.scrollY;
  progressBar.style.height = `${(scrollY / documentHeight) * 100}vh`;
  const windowTop = window.pageYOffset;
  if (windowTop >= mainHeader.offsetHeight / 2 && windowTop <= mainHeader.offsetHeight + aboutContainerOne.offsetHeight / 2) {
    let scaleSize = 1 - windowTop / 6000;
    aboutImage.style.transform = `scale(${scaleSize})`;
  } else if (windowTop >= mainHeader.offsetHeight && windowTop <= mainHeader.offsetHeight + aboutSection.offsetHeight) {
    const aboutTwoImg1 = document.querySelector(".about__container--two img:nth-child(1)");
    const aboutTwoImg2 = document.querySelector(".about__container--two img:nth-child(2)");
    let translatePercent = windowTop / 15;

    aboutTwoImg1.style.transform = `translateY(${translatePercent}%)`;
    aboutTwoImg2.style.transform = `translateY(-${translatePercent}%)`;
  }
});

// about observer
const aboutContainer = document.querySelector(".about__container");
const aboutContainerOne = document.querySelector(".about__container--one");
const aboutContainerOneP = document.querySelector(".about__container--one-text p");
const aboutContainerOneH3 = document.querySelector(".about__container--one-text h3");

const aboutObserver = new IntersectionObserver(
  (entries, aboutObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutContainerOne.style.opacity = "1";
        aboutContainerOneP.style.transform = "translateX(0)";
        aboutContainerOneH3.style.transform = "translateX(0)";
      } else {
        aboutContainerOne.style.opacity = "0";
        aboutContainerOneP.style.transform = "translateX(-100%)";
        aboutContainerOneH3.style.transform = "translateX(-100%)";
      }
    });
  },
  {
    threshold: 0.3,
    rootmargin: 0,
  }
);

aboutObserver.observe(aboutContainer);

// about 2 observer
const aboutContainerTwo = document.querySelector(".about__container--two");
const aboutTwoText = Array.from(document.querySelectorAll(".about__box--reveal p"));

const aboutObserver2 = new IntersectionObserver(
  (entries, aboutObserver2) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutTwoText.forEach((text, index) => {
          setTimeout(() => {
            text.style.transform = "translateX(0%)";
            text.style.opacity = "1";
          }, 100 * index);
        });
      } else {
        aboutTwoText.forEach((text) => {
          text.style.transform = "translateX(-100%)";
          text.style.opacity = "0";
        });
      }
    });
  },
  {
    threshold: 0.2,
    rootmargin: 0,
  }
);

aboutObserver2.observe(aboutContainerTwo);

// Skilss observer

const mediaQueryList = window.matchMedia("(max-width: 768px)");

function handleOrientationChange(evt) {
  if (evt.matches) {
    /* The viewport is currently in portrait orientation */
    const skillsBox = document.querySelectorAll(".skills__box");

    const skillsBoxObserver = new IntersectionObserver(
      (entries, skillsBoxObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("skills__box--active");
            skillsBoxObserver.unobserve(entry.target);
          } else {
            return;
          }
        });
      },
      {
        threshold: 0.5,
        rootmargin: 0,
      }
    );

    skillsBox.forEach((box) => {
      skillsBoxObserver.observe(box);
    });
  } else {
    /* The viewport is currently in landscape orientation */
    const skills = document.querySelector(".skills");
    const skillsBox = document.querySelectorAll(".skills__box");

    const skillsObserver = new IntersectionObserver(
      (entries, skillsObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillsBox.forEach((box, index) => {
              setTimeout(() => {
                box.classList.add("skills__box--active");
              }, 200 * index);
            });
          } else {
            skillsBox.forEach((box, index) => {
              setTimeout(() => {
                box.classList.remove("skills__box--active");
              }, 100 * index);
            });
          }
        });
      },
      {
        threshold: 0.25,
        rootmargin: 0,
      }
    );

    skillsObserver.observe(skills);
  }
}
// Run the orientation change handler once.
handleOrientationChange(mediaQueryList);
// Add the callback function as a listener to the query list.
mediaQueryList.addEventListener("change", handleOrientationChange);

// Projects Obsever
const projects = document.querySelector(".projects");
const projectsContent = document.querySelector(".projects__content");

const projectsObserver = new IntersectionObserver(
  (entries, projectsObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        projectsContent.style.opacity = "1";
      } else {
        projectsContent.style.opacity = "0";
      }
    });
  },
  {
    threshold: 0.2,
    rootmargin: 0,
  }
);

projectsObserver.observe(projectsContent);

// Show projects when clicked

function showProject(projectNum, whiteLine, blueLine, projectText, closeBtn, projectImg) {
  projectNum.style.transform = "translateX(0)";
  whiteLine.style.width = "70%";
  blueLine.style.opacity = "1";

  projectText.forEach((text) => {
    text.classList.add("project__active");
  });

  projectImg.forEach((image) => {
    image.classList.add("project__active");
  });

  closeBtn.addEventListener("click", function () {
    projectNum.style.transform = "translateX(-100%)";
    whiteLine.style.width = "0%";
    blueLine.style.opacity = "0";

    projectText.forEach((text) => {
      text.classList.remove("project__active");
    });

    projectImg.forEach((image) => {
      image.classList.remove("project__active");
    });
  });
}

const projectOneContent = document.querySelector(".projects__content--one");
const projectOne = document.querySelector(".projects1");
const projectOneWhite = document.querySelector(".project1__line--white");
const projectOneBlue = document.querySelector(".project1__line--blue");
const projectOneText = document.querySelectorAll(".project1__text--box > *");
const projectOneImage = document.querySelectorAll(".project__image--box--1 > *");
const closeButton1 = document.querySelector(".projects1__closebtn");

projectOneContent.addEventListener("click", function () {
  showProject(projectOne, projectOneWhite, projectOneBlue, projectOneText, closeButton1, projectOneImage);
});

const projectTwoContent = document.querySelector(".projects__content--two");
const projectTwo = document.querySelector(".projects2");
const projectTwoWhite = document.querySelector(".project2__line--white");
const projectTwoBlue = document.querySelector(".project2__line--blue");
const projectTwoText = document.querySelectorAll(".project2__text--box > *");
const projectTwoImage = document.querySelectorAll(".project__image--box--2 > *");
const closeButton2 = document.querySelector(".projects2__closebtn");

projectTwoContent.addEventListener("click", function () {
  showProject(projectTwo, projectTwoWhite, projectTwoBlue, projectTwoText, closeButton2, projectTwoImage);
});

// Footer observer
const footerImg = document.querySelector(".footer__img img");

const footerImgObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        footerImg.style.transform = "scale(1.2)";
      } else {
        footerImg.style.transform = "scale(1)";
      }
    });
  },
  {
    threshold: 0,
    rootmargin: 0,
  }
);
footerImgObserver.observe(footerImg);

const footerContact = document.querySelector(".footer__contact");
const footerContactBox = footerContact.querySelectorAll(".footer__contact--box a");
const footerCopyright = footerContact.querySelector(".footer__copyright");

const footerContactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const footerCopyright = footerContact.querySelector(".footer__copyright");
        footerCopyright.style.opacity = "1";
        footerContactBox.forEach((box, index) => {
          setTimeout(() => {
            box.style.transform = "translateY(0)";
          }, 100 * index);
        });
      } else {
        footerCopyright.style.opacity = "0";
        footerContactBox.forEach((box, index) => {
          box.style.transform = "translateY(100%)";
        });
      }
    });
  },
  {
    threshold: 0,
    rootmargin: 0,
  }
);

footerContactObserver.observe(footerContact);

// Ligh mode
// const bgTheme = document.querySelectorAll("[data-bgtheme]");
// bgTheme.forEach((bg) => {
//   bg.style.backgroundColor = "white";
// });

const themeToggleBtn = document.querySelector(".theme__toggle");

themeToggleBtn.addEventListener("click", function () {
  const ballIcon = document.querySelector(".ball__icon");
  ballIcon.classList.toggle("ball__icon--active");
  const mainArrow = document.querySelector(".main__arrow--down");
  mainArrow.classList.toggle("main__arrow--down-black");
  cursor.classList.toggle("cursor--light");
  const closeBtn = document.querySelectorAll(".close__btn > *");
  closeBtn.forEach((btn) => {
    btn.classList.toggle("close__btn--light");
  });
  // function switchTheme(target, dataAttribute) {
  //   target.forEach((el) => {
  //     if (`el.dataset.${dataAttribute} === "dark"`) {
  //       el.setAttribute(`data-${dataAttribute}`, "light");
  //     } else if (`el.dataset.${dataAttribute} === "light"`) {
  //       el.setAttribute(`data-${dataAttribute}`, "dark");
  //     }
  //   });
  // }
  const bgTheme = document.querySelectorAll("[data-bgtheme]");
  bgTheme.forEach((el) => {
    if (el.dataset.bgtheme === "dark") {
      el.setAttribute("data-bgtheme", "light");
    } else if (el.dataset.bgtheme === "light") {
      el.setAttribute("data-bgtheme", "dark");
    }
  });

  const txtTheme = document.querySelectorAll("[data-txttheme]");
  txtTheme.forEach((el) => {
    if (el.dataset.txttheme === "dark") {
      el.setAttribute("data-txttheme", "light");
    } else if (el.dataset.txttheme === "light") {
      el.setAttribute("data-txttheme", "dark");
    }
  });

  const gradientTheme = document.querySelectorAll("[data-gradient]");
  gradientTheme.forEach((el) => {
    if (el.dataset.gradient === "dark") {
      el.setAttribute("data-gradient", "light");
    } else if (el.dataset.gradient === "light") {
      el.setAttribute("data-gradient", "dark");
    }
  });

  const borderTheme = document.querySelectorAll("[data-border]");
  borderTheme.forEach((el) => {
    if (el.dataset.border === "dark") {
      el.setAttribute("data-border", "light");
    } else if (el.dataset.border === "light") {
      el.setAttribute("data-border", "dark");
    }
  });
});

console.log("%cBest view in 1280 x 800 device 😄", "border: 0.2px solid blue");
