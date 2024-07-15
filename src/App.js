import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import appRouter from "./route/Route";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function App() {
  // cursor start
  const customCursor = () => {
    // Cursor STARTs
    var windowWidth = window.innerWidth;
    if (windowWidth > 1201) {
      // console.log("123");
      class RingDot {
        constructor() {
          this.root = document.body;
          this.cursor = document.querySelector(".curzr");
          this.dot = document.querySelector(".curzr-dot");

          this.pointerX = 0;
          this.pointerY = 0;
          this.cursorSize = 16.6;

          this.cursorStyle = {
            boxSizing: "border-box",
            position: "fixed",
            display: "flex",
            top: `${this.cursorSize / -2}px`,
            left: `${this.cursorSize / -2}px`,
            zIndex: "2147483647",
            justifyContent: "center",
            alignItems: "center",
            width: `${this.cursorSize}px`,
            height: `${this.cursorSize}px`,
            // backgroundColor: '#2effd78e',
            backgroundColor: "#57fd2e960",

            boxShadow: "0 0 0 1.25px #000, 0 0 0 2.25px #000",
            borderRadius: "50%",
            transition: "200ms, transform 33ms",
            userSelect: "none",
            pointerEvents: "none",
          };

          this.dotStyle = {
            boxSizing: "border-box",
            position: "fixed",
            zIndex: "2147483647",
            width: "4px",
            height: "4px",
            backgroundColor: "#57fd2e96;",
            boxShadow: "0 0 0 1px #57fd2e96;",
            borderRadius: "50%",
            userSelect: "none",
            pointerEvents: "none",
          };

          this.init(this.cursor, this.cursorStyle);
          this.init(this.dot, this.dotStyle);
        }

        init(el, style) {
          Object.assign(el.style, style);
          this.cursor.removeAttribute("hidden");

          document.body.style.cursor = "none";
          document.body
            .querySelectorAll("button, label, input, textarea, select, a")
            .forEach((el) => {
              el.style.cursor = "inherit";
            });
        }
        //
        move(event) {
          if (
            event.target.localName == "button" ||
            event.target.localName == "a" ||
            event.target.classList.contains("curzr-hover") ||
            event.target.classList.contains("swiper-nav") ||
            event.target.classList.contains("pagination") ||
            event.target.onclick !== null
          ) {
            this.hover(60);
          } else if (
            event.target.classList.contains("black-bg") ||
            event.target.classList.contains("change-cursor")
          ) {
            // console.log(event);
            this.colorChange();
          } else {
            this.hoverout();
          }

          this.pointerX = event.pageX + this.root.getBoundingClientRect().x;
          this.pointerY = event.pageY + this.root.getBoundingClientRect().y;

          this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
        }

        hover(radius) {
          this.cursor.style.width = this.cursor.style.height = `${radius}px`;
          this.cursor.style.top = this.cursor.style.left = `${radius / -2}px`;
          this.cursor.style.border = "30px solid #2effd78e";
          this.cursor.style.boxShadow =
            "0 0 0 1.25px #2effd78e, 0 0 0 2.25px #2effd78e";
        }

        hoverout() {
          this.cursor.style.width =
            this.cursor.style.height = `${this.cursorSize}px`;
          this.cursor.style.top = this.cursor.style.left = `${
            this.cursorSize / -2
          }px`;
          this.cursor.style.border = "1px solid #fff0";
          this.cursor.style.boxShadow = "0 0 0 1.25px #000, 0 0 0 2.25px #000";
        }

        click() {
          this.cursor.style.transform += ` scale(0.75)`;
          setTimeout(() => {
            this.cursor.style.transform = this.cursor.style.transform.replace(
              ` scale(0.75)`,
              ""
            );
          }, 35);
        }

        remove() {
          this.cursor.remove();
          this.dot.remove();
        }

        colorChange() {
          // console.log("change");
          this.cursor.style.borderColor = "#56fd2e";
          this.cursor.style.boxShadow =
            "0 0 0 1.25px #56fd2e, 0 0 0 2.25px #56fd2e";
        }
      }

      // function

      (() => {
        const cursor = new RingDot();
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          document.onmousemove = function (event) {
            let cChange = false;
            cursor.move(event);
            // event.path.forEach((e) => {
            //   console.log(e);
            //   if (e?.classList?.contains('black-bg')) {
            //     cChange = true;
            //     return false;
            //   } else {
            //     return true;
            //   };
            // });
            // if (cChange) {
            //   cursor.colorChange();
            // } else {
            //   cursor.move(event);
            // }
          };

          document.onclick = function () {
            cursor.click();
          };

          // document.querySelectorAll('.black-bg').forEach((e, i) => {
          //   e.onmousemove = function () {
          //     cursor.colorChange();
          //   };
          // })
        } else {
          cursor.remove();
        }
      })();
    }
    // Cursor ENDs
    // $(".card-wrap").mouseover(function (e) {
    //   e.preventDefault();

    //   document.getElementByClassName("card-wrap")[0].mousemove(function (e) {
    //     e.preventDefault();
    //     let cox = (e.pageX - this.offset().left - this.width() / 2) / 20;
    //     let coy = (this.height() / 2 - (e.pageY - this.offset().top)) / 20;
    //     this
    //       .find(".card-box-wrap").css("-webkit-transform", "rotateY(" + cox + "deg) rotateX(" + coy + "deg)")
    //     this
    //       .find(".card-box").css("-webkit-transform", "translateX(" + cox + "px) translateY(" + -coy + "px)")
    //   });

    //   document.getElementByClassName("card-wrap")[0].mouseleave(function (e) {
    //     e.preventDefault();
    //     this.find(".card-box-wrap").css("-webkit-transform", "rotateY(0) rotateX(0)");
    //     this.find(".card-box").css("-webkit-transform", "translateX(0) translateY(0)");
    //   });
  };
  // cursor end

  // headerScroll start
  const headerScroll = () => {
    function fixedHeader() {
      var header = document.getElementById("header");
      var scroll = window.scrollY;

      if (scroll >= 10) {
        header.classList.add("fixHeader");
      } else {
        header.classList.remove("fixHeader");
      }
    }

    window.addEventListener("scroll", function (e) {
      fixedHeader();
    });

    fixedHeader();

    window.addEventListener("beforeunload", function () {
      window.scrollTo(0, 0);
    });
  };
  // headerScroll end

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // var hasToken = localStorage.getItem("sToken");
    // // console.log(hasToken);
    // if (hasToken) {
    //   localStorage.removeItem("sToken");
    // } else {
    //   getToken();
    // }

    // getToken();

    // customCursor();
    headerScroll();
  }, []);

  return (
    <React.StrictMode>
      <RouterProvider router={appRouter} />
    </React.StrictMode>
  );
}

export default App;
